// basic base64 encode 
// You can see more here : http://www.webtoolkit.info/javascript-base64.html
function encode(input) {

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}


/**
 * This method retrieves image from ipfs
 * @param {string} file_hash hash of file that we want to retrieve
 * @param {HTMLElement} image_div div where we want to put this file
 */
function get_photo(file_hash, image_div) {
    ipfs.get(file_hash, function (err, res) {
        let arr = res[0].content;
        image_div.src = 'data:image/png;base64,' + encode(arr);
    });
}

/**
 * This method handles voting
 * @param {Number} ind index of candidate
 */
function vote(ind) {
    var e = document.getElementById('options');
    var addr = e.options[e.selectedIndex].text;

    vouting.vote.sendTransaction(ind, {
        from: addr,
        gas: 123123,
        data: "asdasd" // deploying a contracrt
    }, function (error, res) {
        if (error) {
            console.log(error);
        }

        if (res == true) {
            var voteCount = document.getElementById("voteCount" + ind.toString()).innerHTML;
            voteCount = parseInt(voteCount) + 1;
        }

    });

}

/**
 * This method handles 
 */
function sendContract() {
    console.log(file)
    var reader = new FileReader();
    reader.onloadend = function () {
        const files = [
            {
                path: file.name,
                content: ipfs.types.Buffer.from(reader.result)
            }
        ]
        ipfs.add(files, function (err, res) {
            if (err) {
                console.error(err)
                return
            }

            var e = document.getElementById('options');
            var addr = e.options[e.selectedIndex].text;
            var name = $("#name").val()
            var description = $("#description").val()
            vouting.addCandidate.sendTransaction(name, description, res[0].hash, {
                from: addr,
                gas: 1231233, // TODO: must be changed to something reasonable
                data: "asdasd" // TODO: must be changed to something reasonable
            }, function (error, hash) {
                if (error) {
                    console.log(error);
                }
                location.reload();
            });

        });

    };
    reader.readAsArrayBuffer(file);
}

/**
 * This method handles candidates' appearance on page
 */
function drawCandidates() {
    vouting.getCandidateCount.call(function (err, res) {
        if (err) {
            console.log("Error occured");
            return;
        }
        let candidateCount = res;
        console.log(res);
        for (let i = 0; i < candidateCount; i++) {
            vouting.getCandidate.call(i, function (err, res) {
                if (err) {
                    console.log("Error occured");
                    return;
                }
                ipfs.get(res[3], function (err, res1) {
                    let arr = res1[0].content;
                    var addDiv = "<div class=\"candidate-item\">\n" +
                        "            <img class=\"avatar-img\" src=\"data:image/png;base64," + encode(arr) + "\">\n" +
                        "            <p>" + res[1] + "</p>\n" +
                        "            <p>" + res[2] + "</p>\n" +
                        "            <button class=\"vote-button\" onclick = \"vote(" + res[0] + ")\">Vote</button>\n" +
                        "            <p id=\"voteCount" + res[0].toString() + "\">" + res[4] + "</p>\n" +
                        "        </div>"
                    document.getElementById("candidates").innerHTML += addDiv;
                });
            });
        }
    });

}

///////// Some front-end stuff
let file = undefined;
function showModal() {
    document.getElementById("modal").classList.add("modal-active");
    document.getElementById("modal-body").classList.add("modal-body-active");
}
function hideModal() {
    document.getElementById("modal").classList.remove("modal-active");
    document.getElementById("modal-body").classList.remove("modal-body-active");
}
window.addEventListener("click", (evt) => {
    if (evt.target === document.getElementById("modal")) {
        hideModal();
    }
})
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    file = ev.dataTransfer.files[0];
    document.getElementById("drag-and-drop").innerText = "File added!"
}
