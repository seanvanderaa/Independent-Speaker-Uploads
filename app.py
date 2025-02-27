from flask import Flask, request, render_template

app = Flask(__name__)


@app.context_processor
def inject_files():

    #This will need to hold/store the data for the files in the user's sidebar

    files = [
        {"filename": "Tammy Baldwin Interview", "profiles": "Tammy Baldwin, Eric Hovde", "upload_date": "Dec. 2, 2024"},
        {"filename": "Texas Town Hall, Feb. 10, 2025", "profiles": "Greg Abbott, Ted Cruz, Ken Paxton", "upload_date": "Dec. 2, 2024"},
        {"filename": "The CA Governor's Take on Project 2025", "profiles": "Gavin Newsom", "upload_date": "Dec. 2, 2024"}
    ]

    # All data here is placeholder used to test and build out the pages. These will need to be replaced.

    # Processing is for after a user has submitted a file. Changing the truth value will change what's displayed in the sidebar.
    processing_on = False
    processing = [
        {"filename": "Date Uploaded"},
    ]

    if processing_on:
        return dict(files=files, processing=processing)
    else: 
        return dict(files=files)

@app.route("/")
def index():
    # Default landing page
    return render_template("landing.html", partial="partials/_landing_add.html")

@app.route("/path")
def landing_path():
    # Route to select private/public upload
    return render_template("landing.html", partial="partials/_landing_path.html")

@app.route("/source/add/pub")
def landing_source_add_pub():
    # Public route
    return render_template("landing.html", partial="partials/_landing_source_add_pub.html")

@app.route("/source/add/priv")
def landing_source_add_priv():
    # Private route
    return render_template("landing.html", partial="partials/_landing_source_add_priv.html")

@app.route("/process-upload", methods=["GET","POST"])
def process_upload():
    ### Take in the inputs from the form here. This is where we can process the file and begin the processing steps.
    return render_template("landing.html", partial="partials/_landing_add.html")

@app.route('/source-view')
def source_view():
    active_file = request.args.get('file', '')

    # All of these are example data sets used to construct. Should be deleted and replaced with data from the DB.
    profiles = [
        {"name": "Greg Abbott", "sources": "12", "subjects": "25", "claims": "30"},
        {"name": "Ken Paxton", "sources": "14", "subjects": "28", "claims": "35"},
    ]

    subjects = [
        {
            "title": "Housing Crisis",
            "summary": "Lorem ipsum dolor sit amet consectetur. Volutpat sagittis pellentesque feugiat pretium mi mattis id fringilla. Magnis ultrices bibendum dictumst sem amet aliquam nulla maecenas erat. Enim scelerisque felis orci aliquam semper. Volutpat duis imperdiet nec non enim pellentesque et. Sit consectetur rutrum sit a aliquet. Venenatis in elit dolor quis at euismod sed.",
            "timestamps": ["0:00-1:11", "2:30-3:45"],
            "claims": [
                {
                    "claim": "Housing prices have increased by 50% in the past decade.",
                    "assertion": "This trend is primarily driven by a shortage of available housing units.",
                    "timestamp": "1:19-1:23"
                },
                {
                    "claim": "Rent control policies reduce displacement.",
                    "assertion": "Studies indicate that rent control policies help stabilize communities.",
                    "timestamp": "2:33-2:52"
                }
            ]
        },
                {
            "title": "Housing Crisis",
            "summary": "Lorem ipsum dolor sit amet consectetur. Volutpat sagittis pellentesque feugiat pretium mi mattis id fringilla. Magnis ultrices bibendum dictumst sem amet aliquam nulla maecenas erat. Enim scelerisque felis orci aliquam semper. Volutpat duis imperdiet nec non enim pellentesque et. Sit consectetur rutrum sit a aliquet. Venenatis in elit dolor quis at euismod sed.",
            "timestamps": ["0:00-1:11", "2:30-3:45"],
            "claims": [
                {
                    "claim": "Housing prices have increased by 50% in the past decade.",
                    "assertion": "This trend is primarily driven by a shortage of available housing units.",
                    "timestamp": "1:19-1:23"
                },
                {
                    "claim": "Rent control policies reduce displacement.",
                    "assertion": "Studies indicate that rent control policies help stabilize communities.",
                    "timestamp": "2:33-2:52"
                }
            ]
        }
    ]

    public = False
    speakers_verified = True #Use this to toggle on/off the verify speaker popup modal

    if speakers_verified:
        return render_template('source.html',
                            partial_summary="partials/_source_summary.html",
                            partial_profile="partials/_source_profile.html",
                            profiles=profiles,
                            subjects = subjects,
                            public=public,
                            speakers_verified = speakers_verified,
                            active_file=active_file)
    else:
        return render_template('source.html',
                            partial_summary="partials/_source_summary.html",
                            partial_profile="partials/_source_profile.html",
                            partial_verify="partials/_source_verify_speakers.html",
                            profiles=profiles,
                            subjects = subjects,
                            public=public,
                            speakers_verified = speakers_verified,
                            active_file=active_file)

if __name__ == "__main__":
    app.run(debug=True)
