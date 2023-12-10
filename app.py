from flask import Flask, request, render_template
from openai import OpenAI

app = Flask(__name__)

def prompt(inp):
    client = OpenAI(
        api_key="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",
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": inp,
            }
        ],
        model="gpt-3.5-turbo",
    )

    
    return chat_completion.choices[0].message.content

app.debug = True

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/q/<m>')
def qui_p(m):
   return render_template('q.html',url=m)

@app.route('/make')
def make():
    clss = request.args.get('class')
    chapter = request.args.get('chapter')
    subject = request.args.get('subject')
    questions = request.args.get('question')

    if(clss and chapter and subject and questions == ''):
        return 'error'


    if(int(questions) > 10):
        return 'Questions More than 10'
    m = 'Error While Doing This'

    try:
        m = prompt("""
    Write """ + questions + """ Questions of """ + clss + """th class """ + subject + """ subject and ch - """ + chapter + """in this json formate don't miss anythings and make sure the option and answer are not too long it must be 8-10 words or there must be only 4 option and use html in options and questions only for like m^2 - m<sup>2</sup> in options and questions.

    {
    "all": 2,
    "title": "MCQ Class 9 Science Chapter 1 States of Matter",
    "class": "9",
    "subject": "Chemisitry",
    "seo_keywords": ["chemisitry","class 9", "matter","mcq","chapter 1"]
    "url": "science-chapter-1-matter-in-our-surrounding",
    "description": "Matter in Our Surrounding Class 9 MCQ: Here, You will get Class 9 MCQ on Matter in Our Surrounding at free of cost. Along with you can take online MCQ test for Matter in Our Surrounding to get higher marks in Class 9 Examinations.",
    "1": {
    "Q": "What is the SI unit of time?",
    "1": "second",
    "2": "m/s<sup>2</sup>",
    "3": "hour",
    "4": "day",
    "ans": "second"
    },
    "2": {
    ....
    }
    }

    don't miss anythings and make sure the option and answer are not too long it must be 8-10 words or there must be only 4 option and only use html for powers and H20 like formulas m<sup>2</sup> in options and questions don't use this ^.
    give me a valid json becuase i have parase it. and in 'all' your have to place no of questions in json code. and dont generate image option. only return json
    """)
    except Exception as error:
        # Handle the exception and store the error information in a variable
        error_type = type(error).__name__
        error_message = str(error)
        return (f"An error of type {error_type} occurred: {error_message}")




    return m


@app.route('/indra')
def indra():
    try:
        clss = request.args.get('class')
        chapter = request.args.get('chapter')
        subject = request.args.get('subject')
        questions = request.args.get('question')

    except:
        return "Not Found"

    if(clss and chapter and subject and questions == ''):
        return 'error'


    if(int(questions) > 10):
        return 'Questions More than 10'
    m = 'Error While Doing This'

    try:
        m = prompt("""
    Write """ + questions + """ Questions of """ + clss + """th class """ + subject + """ subject and ch - """ + chapter + """in this json formate don't miss anythings and make sure the option and answer are not too long it must be 8-10 words or there must be only 4 option and use html in options and questions only for like m^2 - m<sup>2</sup> in options and questions.

    {
    "all": 2,
    "title": "MCQ Class 9 Science Chapter 1 States of Matter",
    "class": "9",
    "subject": "Chemisitry",
    "seo_keywords": ["chemisitry","class 9", "matter","mcq","chapter 1"]
    "url": "science-chapter-1-matter-in-our-surrounding",
    "description": "Matter in Our Surrounding Class 9 MCQ: Here, You will get Class 9 MCQ on Matter in Our Surrounding at free of cost. Along with you can take online MCQ test for Matter in Our Surrounding to get higher marks in Class 9 Examinations.",
    "1": {
    "Q": "What is the SI unit of time?",
    "1": "second",
    "2": "m/s<sup>2</sup>",
    "3": "hour",
    "4": "day",
    "ans": "second"
    },
    "2": {
    ....
    }
    }

    don't miss anythings and make sure the option and answer are not too long it must be 8-10 words or there must be only 4 option and only use html for powers and H20 like formulas m<sup>2</sup> in options and questions don't use this ^.
    give me a valid json becuase i have parase it. and in 'all' your have to place no of questions in json code. and dont generate image option. only return json
    """)
    except Exception as error:
        # Handle the exception and store the error information in a variable
        error_type = type(error).__name__
        error_message = str(error)
        return (f"An error of type {error_type} occurred: {error_message}")




    return m



# Step 4: Run your Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0')