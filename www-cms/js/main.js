function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._unitTesting = false; // Unit Testing the ApplicationDbContext or not

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.dds.cms'); // Intialize the ApplicationDbContext with the connection string as parameter value

            this._frmPostCreate = document.querySelector('#frm-post-create'); // Cache Form Post Create
            this._listPosts = document.querySelector('.list-posts'); // Cache List Posts

            this.registerEventListeners(); // Register all Event Listeners
            
            if(this._unitTesting) {
                this.unitTestPosts(); // Unit Testing: Posts
            }

            this.updateUIPostsList(); // Update UI for list of posts
        },
        "registerEventListeners": function() {

            // Event Listeners for Form Post Create
            if(this._frmPostCreate != null) {
                var self = this; // Hack for this keyword within an event listener of another object
                
                this._frmPostCreate.addEventListener('submit', function(ev) {
                    ev.preventDefault();
                    
                    var post = new Post(); // Create a new Post Object
                    post.Title = Utils.trim(this.querySelectorAll('[name="txtTitle"]')[0].value);
                    post.Synopsis = Utils.trim(this.querySelectorAll('[name="txtSynopsis"]')[0].value);
                    post.Story = Utils.trim(this.querySelectorAll('[name="txtStory"]')[0].value);
                
                    // Add Post via the ApplicationDbContext to the localstorage
                    var addedPost = self._applicationDbContext.addPost(post);
                    if(addedPost != null) {
                        self.updateUIPostsList();
                    }
                    
                    return false;
                });
            }

        },
        "updateUIPostsList": function() {
            var posts = this._applicationDbContext.getPosts(); // Get all posts via the ApplicationDbContext

            if(this._listPosts != null) {

                if(posts != null && posts.length > 0)
                {
                    var strHTML = '', post = null;
                    for(var i=0; i < posts.length;i++) {
                        post = posts[i]; // Get post from the array of posts by certain index i
                        strHTML += '<div class="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone  mdl-shadow--2dp tweet' + ((post.DeletedAt != null)?' tweet--softdeleted':'') + '" data-id="' + post.Id + '">';
                        strHTML += '<div class="mdl-card__supporting-text">';
                        strHTML += '<h4>' + post.Title + '</h4>';
                        strHTML += '<p>' + post.Synopsis + '</p>';
                        strHTML += '</div>';
                        strHTML += '<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn-' + post.Id + '">';
                        strHTML += '<i class="material-icons">more_vert</i>';
                        strHTML += '</button>';
                        strHTML += '<ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn-' + post.Id + '">';
                        strHTML += '<li class="mdl-menu__item">Edit</li>';
                        strHTML += '<li class="mdl-menu__item">';
                        strHTML += (post.DeletedAt == null || post.DeletedAt == undefined)?'Soft-delete':'Soft-undelete';
                        strHTML += '</li>';
                        strHTML += '<li class="mdl-menu__item">Delete</li>';
                        strHTML += '</ul>';
                        strHTML += '</div>';
                    }
                    this._listPosts.innerHTML = strHTML;
                    componentHandler.upgradeAllRegistered(); // Update Material Design Lite Event Listeners for all new elements into the DOM
                }
            }
        },
        "unitTestPosts": function() {
            // TEST
            if(this._applicationDbContext.getPosts() == null) {
                // CREATE POST
                var post = new Post();
                post.Title = 'Nintendo NES Classic Review - Schattig, maar komt iets tekort';
                post.Synopsis = 'Hij is klein, hij is schattig en hij verschijnt op precies het juiste moment. Rara wat is dat? Dat moet de NES Classic zijn, die het vast goed gaat doen in de komende cadeautjesperiode. Althans: als hij leverbaar is. Nintendo heeft een perfect moment uitgekozen om het kleine hebbedingetje op de markt te brengen, en er is dan ook veel belangstelling voor de miniconsole. Overigens is er wat verwarring over de naam van het ding, want Nintendo hanteert verschillende varianten. Op de doos wordt het aangeduid als Nintendo Classic Mini, op de site heeft Nintendo het over de NES Classic Edition en in persberichten wordt het apparaatje aangeduid als Nintendo Classic Mini: Nintendo Entertainment System. Wij houden het voorlopig maar op NES Classic.';
                post.Story = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. An quod ita callida est, ut optime possit architectari voluptates? Nunc haec primum fortasse audientis servire debemus. Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Qui autem esse poteris, nisi te amor ipse ceperit? Ergo adhuc, quantum equidem intellego, causa non videtur fuisse mutandi nominis. Duo Reges: constructio interrete. Mihi enim erit isdem istis fortasse iam utendum. Quid sequatur, quid repugnet, vident. </p><p>Quasi vero, inquit, perpetua oratio rhetorum solum, non etiam philosophorum sit. Quae cum essent dicta, finem fecimus et ambulandi et disputandi. Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Id enim natura desiderat. Graece donan, Latine voluptatem vocant. Odium autem et invidiam facile vitabis. Etenim si delectamur, cum scribimus, quis est tam invidus, qui ab eo nos abducat? Verba tu fingas et ea dicas, quae non sentias? Quae cum magnifice primo dici viderentur, considerata minus probabantur. Honesta oratio, Socratica, Platonis etiam. </p><p>Scio enim esse quosdam, qui quavis lingua philosophari possint; Quod quidem iam fit etiam in Academia. Hoc simile tandem est? Quae autem natura suae primae institutionis oblita est? Quid dubitas igitur mutare principia naturae? </p><p>Quid de Pythagora? Cur deinde Metrodori liberos commendas? Hoc ipsum elegantius poni meliusque potuit. Cui Tubuli nomen odio non est? Age, inquies, ista parva sunt. Ut pulsi recurrant? Etenim semper illud extra est, quod arte comprehenditur. Equidem, sed audistine modo de Carneade? </p><p>Aliter enim explicari, quod quaeritur, non potest. Mihi enim satis est, ipsis non satis. Nam quibus rebus efficiuntur voluptates, eae non sunt in potestate sapientis. Si enim ad populum me vocas, eum. Sed ad bona praeterita redeamus. Inde sermone vario sex illa a Dipylo stadia confecimus. Non quaero, quid dicat, sed quid convenienter possit rationi et sententiae suae dicere. Ad corpus diceres pertinere-, sed ea, quae dixi, ad corpusne refers? Isto modo, ne si avia quidem eius nata non esset. Quacumque enim ingredimur, in aliqua historia vestigium ponimus. </p>'
                var postAdded = this._applicationDbContext.addPost(post);
                console.log(postAdded);
            } else {
                // UPDATE A POST
                var id = this._applicationDbContext.getPosts()[0].Id;
                var post = this._applicationDbContext.getPostById(id);
                if(post != null) {
                    post.Title = 'Nintendo NES Classic Review - Schattig, maar komt iets tekort';
                    var result = this._applicationDbContext.updatePost(post);
                    console.log(result);
                }
                // SOFT DELETE OR UNDELETE A POST
                post = this._applicationDbContext.getPostById(id);
                if(post != null) {
                    var result = (post.DeletedAt == null || post.DeletedAt == undefined)?this._applicationDbContext.softDeletePost(post.Id):this._applicationDbContext.softUnDeletePost(post.Id);
                    console.log(result);
                }
                // DELETE A POST
                post = this._applicationDbContext.getPostById(id);
                if(post != null) {
                    var result = this._applicationDbContext.deletePost(post.Id)
                    console.log(result);
                }
            }
        }
    };

    App.init();
});