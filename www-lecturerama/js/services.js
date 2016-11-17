/*
ApplicationDbContext
--------------------
1) Database transactions to the database --> localstorage
2) Cache
*/

var ApplicationDbContext = {
    "init": function(strConnection) {
        this._strConnection = strConnection; // Connection string to the key in the localstorage
        this._dbData = {
            "info": {
                "title": "Lecturerama",
                "description": "App for students: See if a lecturer is present",
                "version": "1.0.",
                "modified": "2016-11-17",
                "author": "AHS - GDM - MMP"
            },
            "lecturers": [],
            "timetable": [],
            "settings": []
        }; // JSON-string: The data as value of the previous connection string (key in the localstorage)
        // Save the data in the localstorage. First check if the data is present in the database. If present -> GET THE DATA. If not --> SAVE _dbData in the database
        if(Utils.store(this._strConnection) != null) {
            this._dbData = Utils.store(this._strConnection);
        } else {
            Utils.store(this._strConnection, this._dbData);
        }
    }
};