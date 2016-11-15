/*
ApplicationDbContext
--------------------
1) Database transactions: CRUD operations
2) Cache for loaded content / data
*/
var ApplicationDbContext = {
    "init": function(strConnection) {
        this._strConnection = strConnection; // Connection String to the key in the localstorage
        this._dbData = {
            "info": {
                "title": "FROUFROU: CMS Application",
                "version": "1.0.",
                "modified": "2016-11-15",
                "author": "Philippe De Pauw - Waterschoot"
            },
            "settings": {},
            "posts": [],
            "categories": [],
            "tags": []
        }; // The data as value of the previous key aka connection string
    }
};