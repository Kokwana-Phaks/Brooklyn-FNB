export default function SearchBar({searchTerm,  setSearchTearm}) {
    return(
        <div className="search-container">
            <input
                type="text"
                placeholder="search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTearm(e.target.value)}
                className="search-input" 
              />
        </div>
    );
}