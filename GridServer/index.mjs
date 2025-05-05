import express from 'express'
import fs from 'fs'
import { isAddress, verifyMessage } from 'ethers'

import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { randomBytes, sign } from 'crypto'

import { loadDB, saveDB } from './storage/utils.mjs'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

const app = express()
app.use( bodyParser.json() )
app.use( express.static( path.join( __dirname, 'public' ) ) )

const PORT = 3000
const TOKEN_VALIDITY_MS = 60 * 60 * 1000

let tempTokens = {}



function generateToken() {
    return randomBytes( 16 ).toString( 'base64url' )
}


app.use( ( req, res, next ) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    if (req.method === 'POST') {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }
    next();
} )

app.use( express.static( path.join( __dirname, 'public' ) ) )
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post( '/api/auth-request', ( req, res ) => {
    const { address } = req.body;
    if( !isAddress( address ) ) {
        return res.status( 400 ).json( { 'error': 'Invalid Ethereum address' } )
    }

    const activationCode = generateToken()
    const apiKey = generateToken()
    const timestamp = Date.now()

    tempTokens[ activationCode ] = { activationCode, apiKey, timestamp, 'count': 0 }
    const authUrl = `http://localhost:3000/viewer/auth?activationCode=${activationCode}`
    res.json( { apiKey, authUrl } )
} )


app.post( '/api/auth-address', async( req, res ) => {
console.log( 'Received auth-address request:', req.body )
    const { signature, controllerAddress, universalProfile, activationCode } = req.body
    if( !signature) {
        return res.status( 400 ).json( { 'error': 'Missing required fields' } )
    } else if( !controllerAddress ) {
        return res.status( 400 ).json( { 'error': 'Invalid controller address' } )
    } else if( !universalProfile ) {
        return res.status( 400 ).json( { 'error': 'Invalid universal profile' } )
    } else if( !tempTokens[ activationCode ] ) {
        return res.status( 400 ).json( { 'error': 'Invalid activation code' } )
    } if( tempTokens[ activationCode ].count >= 2 ) {
        return res.status( 400 ).json( { 'error': 'Activation code expired' } )
    } else if( Date.now() - tempTokens[ activationCode ].timestamp > TOKEN_VALIDITY_MS ) {
        return res.status( 400 ).json( { 'error': 'Activation code expired' } )
    }

    const message = `Activation Code: ${activationCode}\nUniversal Profile: ${universalProfile}\nController Address: ${controllerAddress}`;
    const _controllerAddress = verifyMessage( message, signature )
    if( _controllerAddress.toLowerCase() !== controllerAddress.toLowerCase() ) {
        return res.status( 401 ).json( { 'error': 'Invalid signature' } )
    }

    const obj = tempTokens[ activationCode ]
    if( !obj ) {
        return res.status( 400 ).json( { 'error': 'Invalid activation code' } )
    }
    const { apiKey } = tempTokens[ activationCode ]
    delete tempTokens[ activationCode ]
    const db = loadDB()

    const script = '<html><body>HELLO WORLD</body></html>'
    db[ universalProfile.toLowerCase() ] = { apiKey, controllerAddress, script }
    saveDB( db )

    return res.status( 200 ).json( { 
        'status': 'Account created',
        'url': `http://localhost:3000/viewer/grid/${universalProfile}`
    } )
} )

/*
app.delete( '/api/delete-account', ( req, res ) => {
    const { universalProfile } = req.body
    const apiKey = req.headers['x-api-key']
    if( !apiKey ) {
        return res.status( 400 ).json( { 'error': 'Missing API key' } )
    } else if( !universalProfile ) {
        return res.status( 400 ).json( { 'error': 'Missing universal profile' } )
    }

    const db = loadDB()
    const entry = Object
        .entries( db )
        .find( ( [ addr, data ] ) => addr === universalProfile || data.apiKey === apiKey )
    if( !entry) { 
        return res.status(404).json( { 'error': 'Account not found' } ) 
    }

    const [ address, user ] = entry
    if( user.apiKey !== apiKey ) {
        return res.status( 401 ).json( { 'error': 'Invalid API key' } )
    }

    delete db[ address ]
    saveDB( db )

    return res.json( { 'status': 'Account deleted' } )
} )
*/

app.post( '/api/:id/update-script', ( req, res ) => {
    // script in body
    const { script } = req.body
    const apiKey = req.headers['x-api-key']
    if( !apiKey ) {
        return res.status( 400 ).json( { 'error': 'Missing API key' } )
    } else if( !script ) {
        return res.status( 400 ).json( { 'error': 'Missing script' } )
    }

    const db = loadDB()
    const entry = Object
        .entries( db )
        .find( ( [ addr, data ] ) => addr === req.params.id || data.apiKey === apiKey )
    if( !entry) {
        return res.status( 404 ).json( { 'error': 'Account not found' } )
    }
    const [ address, user ] = entry
    if( user.apiKey !== apiKey ) {
        return res.status( 401 ).json( { 'error': 'Invalid API key' } )
    }

    db[ address ].script = script
    saveDB( db )

    return res.json( { 'status': 'Script updated' } )
} )


app.get('/viewer/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign.html'));
});


app.get( '/viewer/grid/:universalProfile', ( req, res ) => {
    console.log( loadDB() )
    const { universalProfile } = req.params
    if( !universalProfile ) {
        return res.status( 400 ).json( { 'error': 'Missing universal profile' } )
    }

    const db = loadDB()
    const entry = Object
        .entries( db )
        .find( ( [ addr, data ] ) => addr === universalProfile.toLowerCase() )
    if( !entry) {
        return res.status( 404 ).json( { 'error': 'Account not found' } )
    }
    const [ address, user ] = entry
    res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
} )


app.listen( PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
} )
