$(document).ready(function(){
    /*import {resetAll,setSentence,rightkeyPressed,rightKeyReleased,wrongKeyPressed
        ,wrongKeyReleased,feedback,keyboardtoggle} from './functions.js' */
    //import * as helpers from './functions.js';
    // does not support modules, need to use packager 

    let sentences = ['Prime Minister Narendra Modi has tweeted that he will address',
    'the nation at 6 pm today. "Will be sharing a message',
    'with my fellow citizens at 6 pm this evening,"PM Modi',
    'wrote in his tweet, urging citizens to tune in.',
    'The Prime Minister did not specify but many speculated',
    'he would speak on the coronavirus situation in the country',
    'of a series of festivals and the approaching winter.',
    'This will be his seventh address to the nation since he announced',
    'a strict lockdown in March-end to check the spread',
    'of the coronavirus. Since June, the nation has been exiting',
    'the restrictions in phases in order to reopen the economy.'
    ];

    const TIMER = 60;
    let sentencePtr = 0;
    let charPtr = 0;
    let currSent;
    let correct = 0;
    let wrong = 0
    let startTest = true;
    keyboardtoggle();
    resetAll();


    // event that detects key press

    let flag = true;
    $(document).on('keypress',function(){
        console.log(event.keyCode);
        if(startTest)
        {
            startTest = false;
            let time = TIMER-1;
            let interval = window.setInterval(function(){
                $('#timer').html(time--);
            },1000);
            setTimeout(function(){
                clearInterval(interval);
                $('#timer').html('time up!');
                $('#timer').append(`Your score is ${correct}`)
                $('#timer').append('<button class="btn btn-success" id="refr">Test Again</button>');
                $('div#sentence').empty();
                $('div#target-letter').empty();
                $('div#yellow-block').hide();
                $('#refr').click(function(){
                    $('#refr').remove();
                    resetAll();
                })
            },1000*TIMER);
        }
        if(charPtr >= currSent.length)
        {
            $('div#yellow-block').show();
            setSentence();
        }
        else if(event.key === currSent.charAt(charPtr))
        {
            if(event.key === ' ')
            {
                if(flag == true)
                    correct++;
                flag = true;
            }
            console.log('yes');
            charPtr++;
            $('div#yellow-block').css('left',(charPtr+1)*17.5+'px');
            $('#target-letter').html(currSent.charAt(charPtr));
            rightkeyPressed(event.keyCode);
            let val = event;
            setTimeout(()=>{
                rightKeyReleased(val.keyCode);
            },100);
        }
        else
        {
            if(event.key != ' ')
            {
            flag = false;
            console.log('no');
            wrongKeyPressed(event.keyCode);
            let val = event;
            setTimeout(function(){
                wrongKeyReleased(val.keyCode); 
            },100);
            }
        }
    })

    //everytime the key is down
    $(document).on('keydown',function(){
        if(event.keyCode == 8 && charPtr > 0) // backspace will go back
        {
            charPtr--;
            $('div#yellow-block').css('left',(charPtr+1)*17.5+'px');
            $('#target-letter').html(currSent.charAt(charPtr));
            if(currSent.charAt(charPtr) === ' ')
                correct--;
        }
    })

    //everytime the key is up



    // method definitions---------------------

    function resetAll(){
        correct = 0;
        sentencePtr = 0;
        wrong = 0;
        setSentence();
        $('#timer').html(TIMER);
        startTest = true;
    }
    
    function setSentence(){
        charPtr = 0;
        $('div#yellow-block').show();
        $('div#yellow-block').css('left',(charPtr+1)*17.5+'px');
        currSent = sentences[sentencePtr++];
        $('div#sentence').html(currSent);
        $('#target-letter').html(currSent.charAt(charPtr));
    }
    
    function rightkeyPressed(val){
        $('#'+val).addClass("highlight-green");
    }
    
    function rightKeyReleased(val){
        $('#'+val).removeClass("highlight-green");
    }
    
    function wrongKeyPressed(val){
        $('#'+val).addClass("highlight-red");

    }
    
    function wrongKeyReleased(val){
        $('#'+val).removeClass("highlight-red");
    }   
    
    function feedback(val)
    {
        if(val == false)
            $('#feedback').append('<p style="color:red; display:inline;">W</p>');
        else
            $('#feedback').append('<p style="color:green; display:inline;">R</p>');
    }
    
    
    function keyboardtoggle(){
        $('div#keyboard-upper-container').hide();
        $(document).on('keydown',function(){
            if(event.key == 'Shift')
            {
                $('div#keyboard-upper-container').show();
                $('div#keyboard-lower-container').hide();
            }
        })
        $(document).on('keyup',function(){
            console.log(event.key.charCodeAt(0));
            if(event.key == 'Shift')
            {
                $('div#keyboard-upper-container').hide();
                $('div#keyboard-lower-container').show();
            }
        })
    }
    
    /*export {resetAll,setSentence,rightkeyPressed,rightKeyReleased,wrongKeyPressed
    ,wrongKeyReleased,feedback,keyboardtoggle};*/

})
