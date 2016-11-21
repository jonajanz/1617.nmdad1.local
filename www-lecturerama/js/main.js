function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._unitTesting = false; // Unit Testing the features in ApplicationDbContext or not

            this.URLRANDOMUSERME = 'http://api.randomuser.me/?results=200&callback=json_callback';// Cache the url with random users in variable URLRANDOMUSERME

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.gdm.mmp.lecturerama'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function

            if(this._unitTesting || this._applicationDbContext.getLecturers() == null) {
                this.unitTests();
            }

            this.updateUI();
        },
        "updateUI": function() {
            if(this._applicationDbContext.getLecturers() != null) {
                var tempStr = '';
                var ch = window.innerHeight - 110;
                
                var lecturers = this._applicationDbContext.getLecturers(), lecturer = null;
                for(var i=0;i<lecturers.length;i++) {
                    var lecturer = lecturers[i];
                    tempStr += '<div class="lecturer">';
                    tempStr += '<div class="lecturer__meta">' + '<span class="lecturer__age">' + Utils.getAge(new Date(lecturer.DayOfBirth)) + '</span>' + '</div>';
                    tempStr += '<picture class="lecturer__picture">';
                    tempStr += '<img src="' + lecturer.Picture + '" />';
                    tempStr += '</picture>';
                    tempStr += '<h3 class="lecturer__name">' + lecturer.FirstName + ' ' + lecturer.SurName + '</h3>';
                    tempStr += '<div class="lecturer__actions"><span class="material-icons like">&#xE87D;</span><span class="material-icons dislike">&#xE043;</span></div>';
                };

                document.querySelector('.list-lecturers').innerHTML = tempStr;
            }
        },
        "unitTests": function() {

            var self = this; // Closure

            //Unit Testing the Lecturers
            if(this._applicationDbContext.getLecturers() == null) {

                // Load JSON from corresponding RandomUserMe API with certain URL
                Utils.getJSONPByPromise(this.URLRANDOMUSERME).then(
                    function(data) {
                        var users = data.results, lecturer = null, user = null;
                        for(var i=0;i<users.length;i++) {
                            user = users[i];
                            lecturer = new Lecturer();
                            lecturer.FirstName = user.name.first;
                            lecturer.SurName = user.name.last;
                            lecturer.DayOfBirth = new Date(user.dob);
                            lecturer.Email = user.email;
                            lecturer.Picture = user.picture.large;
                            var lecturerAdded = self._applicationDbContext.addLecturer(lecturer);
                            console.log(lecturerAdded);
                        }
                    },
                    function(status) {
                        console.log(status);
                    }
                );

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    console.log(result);
                }

                // Soft delete or undelete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = (lecturer.DeletedAt == null || lecturer.DeletedAt == undefined)?this._applicationDbContext.softDeleteLecturer(lecturer.Id):this._applicationDbContext.softUnDeleteLecturer(lecturer.Id);
                    console.log(result);
                }

                // Delete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = this._applicationDbContext.deleteLecturer(lecturer.Id)
                    console.log(result);
                }
            }

        }
    };

    App.init();
    
});