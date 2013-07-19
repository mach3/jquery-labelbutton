
module.exports = function(grunt){

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");

    var pkg = grunt.file.readJSON("package.json");
    var banner = grunt.template.process(grunt.file.read("src/banner.js"), {data: pkg});

    grunt.initConfig({
        concat: {
            dist: {
                options: {
                    banner: banner
                },
                files: {
                    "dist/jquery-labelbutton.js": ["src/jquery-labelbutton.js"]
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: banner
                },
                files: {
                    "dist/jquery-labelbutton.min.js": ["src/jquery-labelbutton.js"]
                }
            }
        }
    });

    grunt.registerTask("default", ["concat:dist", "uglify:dist"]);

};