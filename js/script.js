'use strict';

var testContent = [
    {
        title: 'По чём в Одессе рубероид?',
        answers: ['40 рублив','20 грывень','Неизмеримо','Большие, но по 5'],
        correctAnswersIndex: [1]
    },
    {
        title: 'Где живёт фазан?',
        answers: ['У охотника дома','В замке','Маленькие, но по 3','Там, где больше платят'],
        correctAnswersIndex: [0,3]
    },
    {
        title: 'Какой ответ на главный вопрос Жизни, Вселенной и Всего Остального?',
        answers: ['Мама мыла раму','Два с половиной человека','42','1,5 землекопа'],
        correctAnswersIndex: [2]
    }
];

// Saving to storage
localStorage.setItem('testContent', JSON.stringify(testContent));

// Retrieving from storage
let data = JSON.parse(localStorage.getItem('testContent'));


$(function() {

    // Initialising templating
    let tmplModel = $('#tmpl').html();
    let testPage = tmpl(tmplModel, {data});

    // Displaying rendered page
    $('.wrapper').prepend(testPage);



    const numOfQuestions = testContent.length;
    var countCorrectAnswers = 0;
    var countWrongAnswers = 0;

    $('.submit-btn').on('click', checkForm);


    /**
     * Checking form for correct answers
    **/
    function checkForm(e) {
        // Preventing submit button from sending info to server
        e.preventDefault();

        // Comparing results for each question
        for (let i = 0; i < numOfQuestions; i++) {

            let checkboxes = $(`.test-form input[name="Question ${i}"]:checked`);

            for (let input of checkboxes) {
                
                let checkboxVal = parseInt($(input).val());

                // Checking if value of given answer DOESN'T exist in array of correct answers
                if (testContent[i].correctAnswersIndex.indexOf(checkboxVal) == -1) {
                    countWrongAnswers++;
                } else {
                    countCorrectAnswers++;
                }

            }
        }

        if (countWrongAnswers == 0 && countCorrectAnswers >= numOfQuestions) {
            return showModal();
        } else {
            return showModal('fail');
        }

    }

    function showModal(type) {
        let modalMessage;
        let btnText;

        if (type == 'fail') {
            modalMessage = `<p class="modal-heading">Соряныч, попробуй ещё раз!`;
            btnText = `Okay(`;
        } else {
            modalMessage = `<p class="modal-heading">Congratz!</p>Вы успешно прошли тест, ура!`;
            btnText = `Ехууу!`;
        }

        // Creating modal elements
        let modalWindow =
                      $(`<div class="modal-wrap">
                            ${modalMessage}
                            <button type="button" class="modal-close">${btnText}</button>
                        </div>`);
        let overlay = $(`<div class="modal-overlay"></div>`);


        // Appending, positioning and displaying elements
        modalWindow.add(overlay).appendTo('body');
        modalWindow.css({
                    'margin-top': -modalWindow.outerHeight() / 2,
                    'margin-left': -modalWindow.outerWidth() / 2
                  })
                  .add(overlay).fadeIn(300);

        // Handling closing of modal window
        $('.modal-close, .modal-overlay').one('click', () => {
            modalWindow.add(overlay).fadeOut( 400, () => modalWindow.add(overlay).remove() );
        });

        // Clearing results
        countCorrectAnswers = 0;
        countWrongAnswers = 0;
        $('input:checkbox').attr('checked', false);
    }

});