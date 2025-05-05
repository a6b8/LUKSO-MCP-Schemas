function loadDB() {
    const filePath = path.join( __dirname, 'database.json' )
    if (!fs.existsSync(filePath)) fs.writeFileSync( filePath, '{}' )
    return JSON.parse( fs.readFileSync( filePath ) )
}

function saveDB( data ) {
    const filePath = path.join( __dirname, 'database.json' )
    fs.writeFileSync( filePath, JSON.stringify( data, null, 2 ) )
}


export { loadDB, saveDB }