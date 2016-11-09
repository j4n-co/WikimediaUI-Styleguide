/*!
 * Grunt file
 */

module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-stylelint' );
	grunt.loadNpmTasks('grunt-sketch');
	
	grunt.initConfig( {
		// Lint – Styles
		stylelint: {
			src: [
				'css/*.dev.css',
				//'css/partials/**',
				'!node_modules/**'
			]
		},

		// Postprocessing Styles
		postcss: {
			options: {
				processors: [
					require( 'postcss-import' )( {
						from: "css/wmui-styleguide.dev.css"
					} ),
					// require( 'postcss-cssnext' )(),
					require( 'postcss-custom-properties' ),
					require( 'autoprefixer' )( {
						browsers: [
							"Android >= 2.3",
							"Chrome >= 10",
							"Edge >= 12",
							"Firefox >= 3.6",
							"IE >= 8",
							"IE_mob 11",
							"iOS >= 5.1",
							"Opera >= 12.5",
							"Safari >= 5.1"
						]
					} )
				]
			},
			dist: {
				files: {
					'css/wmui-styleguide.css': 'css/wmui-styleguide.dev.css'
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1
			},
			target: {
				files: {
				  'css/wmui-styleguide.min.css': 'css/wmui-styleguide.css'
				}
			}
		},

		/** 
		* Exports specified artboard from Sketch file. 
		* Requires Sketch.app install on mac and Sketchtool. 
		* Sketchtool can be installed with the following command: 
		* /applications/Sketch.app/Contents/Resources/sketchtool/install.sh
		*/
		sketch_export: {
		    artboards: {
		        options: {
		            type: 'artboards',
		            items: [
		                'Artboard M82',
		                'Artboard M101'
		            ],
		            scales: [
		                1.0
		            ],
		            formats: [
		                'png'
		            ]
		        },
		        src: 'resources/WikimediaUI.sketch',
		        dest: 'img'
		    }
		},


		// Development
		watch: {
			files: [
				'**/*.css',
				'.{stylelintrc}'
			],
			tasks: 'default'
		}

	} );

	grunt.registerTask( 'lint', [ 'stylelint' ] );
	grunt.registerTask( 'default', 'lint', 'postcss', 'cssmin' );
};
