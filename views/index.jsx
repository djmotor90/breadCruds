const React = require('react')
const Default = require('./layouts/Default')

function Index ({breadsData, title}) {
    return (
      <Default>
        {/* This is a JSX comment */}
        <h2>Inventory Page</h2>
        <ul>
            {
                breadsData.map((bread, index) =>
                {
                    return(
                    <li key = {index}>
                        <a href ={`/breads/${bread.id}`}>
                            {bread.name}  
                        </a>
                    </li>)
                })
            }
        </ul>
        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>
      </Default>
    )
}

module.exports = Index
