import React from 'react'

export default function Searchbar() {
    return (
        <form>
            <div className="form-group">
                <input type="search" name="search" id="search" placeholder="Search Tirupathi" className="form-control" aria-describedby="serachInput"/>
            </div>
        </form>
    )
}
