function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (Client.isUrlValid(formText)) {

        // posting data to the location /api, this is where the spicy part of server/index.js looks into
        postData('/api', { url: formText })

            .then((res) => {
                // polarity comes in letters from the API, we are making it a bit more readible:
                const polarityInWords = (score_tag) => {
                    let value;
                    if (score_tag.includes('P')) {
                        value = 'Positive.'
                        console.log('seems to be positive')
                    }
                    else if (score_tag.includes('NEU')) {
                        value = 'Neutral.'
                    } else if (score_tag.includes('NONE')) {
                        value = 'No polarity recognized.'
                    } else {
                        value = 'Negative.'
                    }
                    return value;
                }

                // adding the data from the api to the corresponding elements in our index.html file via the ids
                document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}  (${polarityInWords(res.score_tag)}) `;
                document.getElementById('subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById('textsnippet').innerHTML = `Text Snippet: ${res.sentence_list[0].text}`;
            })
    }
}

// as already done in Project 3, the weather journal
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


export { handleSubmit }