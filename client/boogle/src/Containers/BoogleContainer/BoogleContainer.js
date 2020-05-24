import React, { Component } from 'react'

import LeftPan from '../../Components/LeftPan/LeftPan';
import RightPan from '../../Components/RightPan/RightPan';
import classes from './BoogleContainer.css';
import * as Helper from '../../lib/helper';
import * as Apis from '../../lib/Apis';



class BoogleContainer extends Component {
  state = {
    letterLists: null,
    errorMessage: null,
    currentWord: null,
    userWords: null,
    timer: null,
    playing: false,
    matrixSize: null,
    score: null
  }

  fetchLetters = (mat) => {
    mat = mat || this.state.matrixSize;
    const request = Apis.request('GET', Apis.APIS.GET_LETTERS, 'mat=' + mat)
    if (request)
      request
        .then(resp => {
          if (resp && resp.data) {
            const prevState = { ...this.state };
            prevState['letterLists'] = resp.data.letters
            this.setState({
              letterLists: prevState.letterLists,
              playing: true
            }, () => {
              this.startTimer();
            });
          }
        })
        .catch(err => { });
  }

  startTimer = () => {
    let timer = 0;
    this.timer = setInterval(() => {
      this.setState({
        timer: timer
      }, () => {
        timer++;
      })
    }, 1000)
    this.timeout = setTimeout(() => {
      clearInterval(this.timer);
      this.boogleTimed();
    }, 60000 * 0.5)
  }

  boogleTimed = () => {
    this.setState({
      disabledInput: true,
      errorMessage: 'BOOGLE TIMEOUT, GETTING YOUR SCORE'
    });
    const words = this.state.userWords ? [...this.state.userWords] : [];
    const request = Apis.request('POST', Apis.APIS.GET_SCORE, { words: words })
    if (request)
      request
        .then(resp => {
          this.setState({
            score: resp.data.score,
            errorMessage: null
          })
        }).catch(err => {
          console.log(err);
        })
  }

  refreshBoogleHandler = () => {
    clearInterval(this.timer);
    this.setState({
      timer: null,
      userWords: null,
      playing: null,
      score: null,
      errorMessage:null,
      disabledInput: null
    })
    this.fetchLetters();
  }

  startBoogleHandler = (mat) => {
    this.setState({
      matrixSize: mat
    })
    this.fetchLetters(mat);
  }

  checkLetterHandler = (e) => {
    const word = e.target.value;
    const letter = (e.target.value && e.target.value.length) ? e.target.value[e.target.value.length - 1].toLowerCase() : null;
    const letterLists = this.state.letterLists;
    if (!letter) {
      this.setState({
        currentWord: e.target.value,
        errorMessage: null
      });
    }
    else if (letterLists.indexOf(letter[letter.length - 1]) === -1) {
      this.setState({
        errorMessage: 'Letter do not exists'
      })
    } else {
      this.setState({
        currentWord: word,
        errorMessage: null,
      });
    }
  }

  validateWord = (word) => new Promise((resolve, reject) => {
    Helper.ruleValidation(word, this.state.letterLists, this.state.matrixSize)
      .then(resp => {
        const request = Apis.request('GET', Apis.APIS.CHECK_WORD, 'word=' + word)
        if (request)
          request
            .then(resp => {
              return resolve(resp.data.validation);
            })
            .catch(err => {
              console.log(err);
              return reject(err)
            })
      })
      .catch(err => {
        console.log(err);
        return resolve(false)
      })

    // i-5, 
  });

  wordSubmitHandler = (e) => {
    e.preventDefault();
    const currentWord = this.state.currentWord.toLowerCase();
    if (this.state.userWords && this.state.userWords.indexOf(currentWord) > -1) {
      this.setState({
        errorMessage: 'Word already exists',
        currentWord: null
      })
    } else {
      this.validateWord(currentWord)
        .then(resp => {
          if (!resp) {
            this.setState({
              errorMessage: 'Word not valid'
            });
            setTimeout(() => {
              this.setState({
                errorMessage: null
              });
            }, 3000)
          } else {
            const uwordsLists = this.state.userWords ? [...this.state.userWords, currentWord] : [currentWord];
            this.setState({
              userWords: uwordsLists,
              currentWord: null
            })
          }
        }).catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div className={classes.Block}>
        <LeftPan
          startBoogle={this.startBoogleHandler}
          letterLists={this.state.letterLists}
          wordSubmit={this.wordSubmitHandler}
          checkLetter={this.checkLetterHandler}
          errorMessage={this.state.errorMessage}
          currentWord={this.state.currentWord}
          playing={this.state.playing}
          matrix={this.state.matrixSize}
          disabledInput={this.state.disabledInput}
        />
        <RightPan
          refresh={this.refreshBoogleHandler}
          timer={this.state.timer}
          playing={this.state.playing}
          userWords={this.state.userWords}
          score={this.state.score}

        />
      </div>
    )

  }
}

export default BoogleContainer;