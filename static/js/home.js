
bc_chapter = ''
bc_class = ''
bc_sub = ''
function clear_f() {
    bc_chapter = ''
    bc_class = ''
    bc_sub = ''
    filt('f-subject','bc_sub','Subject');
    filt('f-class','bc_class','Class')
    filt('f-chapter','bc_chapter','Chapter')
    search()

}
function pg_load(timer) {
    if ($("#progress").length === 0) {
        // inject the bar..
        $("body").append($("<div><b id='b-e'></b><i id='i-e'></i></div>").attr("id", "progress"));

        // animate the progress..
        $("#progress").width("101%").delay(800).fadeOut(timer, function () {
            // ..then remove it.
            $(this).remove();
        });
    }


}
function filt(id, string, name) {
    ids = document.getElementById(id)
    ids.classList.add('btn-primary')
    ids.classList.remove('btn-info')
    ids.innerHTML = name
    // setting again
    if (eval(string) != '') {
        ids.classList.remove('btn-primary')
        ids.classList.add('btn-info')
        ids.innerHTML = ids.innerHTML + '(' + eval(string) + ')'
    }
}

ads = localStorage.getItem('ads')
if (ads == null) {
    document.getElementById('ads').style.display = 'block'
    document.getElementById('header').style.display = 'none'
    localStorage.setItem('ads', 'yes')

}
if (ads != null) {
    document.getElementById('ads').style.display = 'none'
    document.getElementById('header').style.display = 'block'
}
window.onload = function () {

    // Your JavaScript code to be executed when the window loads goes here
    // For example, you can do something like:
    // or any other JavaScript code you need to run when the page is ready.

    db = ''
    function readTextFile(file) {

        $.get("http://127.0.0.1:5000/get-list", function (data, status) {
            console.log('request')
            // alert("Data: " + data + "\nStatus: " + status);
            allText = data
            localStorage.setItem('list', JSON.stringify(data))
            db = allText



            links = document.getElementById('box_i')
            m = ''
            i = 0
            while (i < db.length) {
                m = `${m}          <div class="col">
                <div class="card shadow-sm">
                    <img src="/images/quiz.webp">
                    <div class="card-body">
                        <p class="card-text">${db[i]['title']}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location='${db[i]['url']}'">Start</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">10 Questions</small>
                        </div>
                    </div>
                </div>
            </div>`
                i++;
            }
            links.innerHTML = m
            document.getElementById('boxes').style.display = 'flex'
            document.getElementById('buffer').style.display = 'none'
            // prompt(allText);
        });
    }


    function lister() {
        if (localStorage.getItem("list") != null) {
            db = JSON.parse(localStorage.getItem("list"))

            links = document.getElementById('box_i')
            console.log('lister')
            m = ''
            i = 0
            while (i < db.length) {
                m = `${m}          <div class="col">
                <div class="card shadow-sm">
                    <img src="/images/quiz.webp">
                    <div class="card-body">
                        <p class="card-text">${db[i]['title']}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location='${db[i]['url']}'">Start</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">10 Questions</small>
                        </div>
                    </div>
                </div>
            </div>`
                i++;
            }
            links.innerHTML = m
            old_box = document.getElementById('box_i').innerHTML

            document.getElementById('boxes').style.display = 'flex'
            // prompt(allText);
            return
        }
        else {

            readTextFile('links.json')
        }
    }

    function rechk() {
        readTextFile('links.json')
    }


    lister()
    rechk()

}
subjectList = ['math', 'science', 'physics', 'chemistry', 'biology']

// Function to extract the subject from a string
function extractSubject(input) {
    // Convert the input to lowercase for case-insensitive comparison
    const lowercaseInput = input.toLowerCase();

    // Loop through the subject list to find a match
    for (const subject of subjectList) {
        if (lowercaseInput.includes(subject)) {
            return subject;
        }
    }
    return null; // Return null if no subject is found
}
function hasCommonElements2(arr1, arr2) {
    // Use nested loops to iterate through both arrays
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            // Compare the elements
            if (arr1[i].toLowerCase() === arr2[j].toLowerCase() && arr2[j].toLowerCase() > 3) {
                console.log('hua')
                return true; // If a common element is found, return true
            }
        }
    }
    // If no common elements were found, return false
    return false;
}
function hasCommonElements(arr1, arr2) {
    // Use nested loops to iterate through both arrays
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            // Compare the elements
            if (arr1[i].toLowerCase() === arr2[j].toLowerCase()) {
                console.log('hua 2')
                return true; // If a common element is found, return true
            }
        }
    }
    // If no common elements were found, return false
    return false;
}
// function search(inp) {
//     for (let index = 0; index < db.length; index++) {
//         db[index]["rank"] = 1
//     }
//     inp = inp.toLowerCase()
//     links = document.getElementById('box_i')
//     if (inp == '') {
//         links.innerHTML = old_box
//         return
//     }
//     if (inp != '') {
//         document.getElementById('header').style.display = 'none'
//         chapter_inp2 = inp.match(/chapter (\d+)/i)
//         class_inp2 = inp.match(/class (\d+)/i)


//         subject_inp = extractSubject(inp)

//         inp_list = inp.split(' ')

//         for (let index = 0; index < db.length; index++) {
//             chapter_db2 = db[index]['title'].toLowerCase().match(/chapter (\d+)/i)


//             if (hasCommonElements(inp_list, JSON.parse(db[index]['keywords'].replace(/'/g, '"')))) {
//                 db[index]['rank'] = db[index]['rank'] + 1

//             }
//             if (db[index]['subject'].toLowerCase() == subject_inp) {
//                 db.unshift(db[index])
//                 // console.log('less than 5')
//             }
//             if (chapter_db2 && chapter_inp2) {
//                 if (chapter_db2[1] == chapter_inp2[1])
//                     db[index]['rank'] = db[index]['rank'] + 1

//             }
//             if (class_inp2) {
//                 if (class_inp2[1] == db[index]['class'])
//                     db[index]['rank'] = db[index]['rank'] + 1


//             }


//             title_list = db[index]['title'].split(' ')
//             if (hasCommonElements(title_list, inp_list)) {
//                 db[index]['rank'] = db[index]['rank'] + 1
//             }

//             // if (db[index]['title'] == inp ) {
//             //     db[index]['rank'] = db[index]['rank'] + 1
//             // }

//         }


//         i = 0
//         db.sort(function (a, b) {
//             console.log('ranking 1')
//             return b.rank - a.rank;
//         });

//         m = ''
//         while (i < db.length) {
//             console.log('ranking')
//             if(db[i]['rank'] == 1){
//                 continue
//             }
//             m = `${m}          <div class="col">
//         <div class="card shadow-sm">
//             <img src="/images/quiz.webp">
//             <div class="card-body">
//                 <p class="card-text">${db[i]['title']}</p>
//                 <div class="d-flex justify-content-between align-items-center">
//                     <div class="btn-group">
//                         <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location='${db[i]['url']}'">Start</button>
//                         <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//                     </div>
//                     <small class="text-body-secondary">10 Questions</small>
//                 </div>
//             </div>
//         </div>
//     </div>`
//             i++;
//         }
//         links.innerHTML = m
//     }

// }
// inputElement = document.getElementById('search-inp')
// function ok_(event){
//     event.preventDefault()
//     search(inputElement.value)
//     document.getElementById('search_form').setAttribute('onsubmit','null')
// }

function search(mode = 0) {
    inp = inputElement.value
    const inputLower = inp.toLowerCase();
    const links = document.getElementById('box_i');

    if (inputLower === '' && mode == 0) {
        document.getElementById('header').style.display = 'block'
        links.innerHTML = old_box;
        return;
    }
    if (mode == 0) {
        // Get the current URL
        const currentURL = window.location.href;

        // Create a new URL with the updated parameter
        const updatedURL = new URL(currentURL);
        updatedURL.searchParams.set('q', inp);

        // Use pushState to change the URL without reloading
        history.pushState(null, null, updatedURL.toString());

    }

    document.getElementById('header').style.display = 'none'
    document.getElementById('filter').style.display = 'block'
    const chapterInput = inputLower.match(/chapter (\d+)/i);
    const classInput = inputLower.match(/class (\d+)/i);

    // chx
    const classInput3 = inputLower.match(/ch(\d+)/i);


    const subjectInput = extractSubject(inputLower);
    const inputList = inputLower.split(' ');
    if (mode == 0) {
        for (let index = 0; index < db.length; index++) {
            db[index]['rank'] = 0;
        }

        for (let index = 0; index < db.length; index++) {
            const chapterDb = db[index]['title'].toLowerCase().match(/chapter (\d+)/i);
            const keywords = JSON.parse(db[index]['keywords'].replace(/'/g, '"'));
            if (hasCommonElements(inputList, keywords)) {
                db[index]['rank'] += 1;
            }

            if (db[index]['subject'].toLowerCase() === subjectInput) {
                db[index]['rank'] += 1;
            }
            if (chapterDb && chapterInput && chapterDb[1] === chapterInput[1]) {
                db[index]['rank'] += 1;
            }

            if (chapterDb && classInput3 && chapterDb[1] === classInput3[1]) {
                db[index]['rank'] += 1;
            }
            if (classInput && classInput[1] === db[index]['class']) {
                db[index]['rank'] += 1;
            }


            const titleList = db[index]['title'].split(' ');
            if (hasCommonElements2(titleList, inputList)) {
                db[index]['rank'] += 1;
            }
        }

        db.sort((a, b) => b.rank - a.rank);
    }
    let m = '';
    for (let i = 0; i < db.length; i++) {
        if (mode != 1) {
            if (db[i]['rank'] === 0) {
                continue;
            }
        }
        if (bc_chapter != '') {
            chp = db[i]['title'].toLowerCase().match(/chapter (\d+)/i)
            if (chp && chp[1] != bc_chapter) {
                continue
            }
        }
        if (bc_class != '') {
            chp = db[i]['class']
            if (chp != bc_class) {
                continue
            }
        }
        if (bc_sub != '') {
            chp = db[i]['subject']
            if (chp != bc_sub) {
                continue
            }
        }
        m += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="/images/quiz.webp">
                    <div class="card-body">
                        <p class="card-text">${db[i]['title']}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location='${db[i]['url']}'">Start</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">10 Questions</small>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    if(m == ''){
        document.getElementById('ads_h1').innerHTML = `<h1>No results for this term '${inp}'. Try Filters or make a custom quiz.</h1>`
        document.getElementById('ads').style.display = 'block'
        return;
    }
    document.getElementById('ads').style.display = 'none'

    links.innerHTML = m;
}

const inputElement = document.getElementById('search-inp');
function ok_(event) {
    event.preventDefault();
    search();
    // document.getElementById('search_form').setAttribute('onsubmit', 'null');
}

