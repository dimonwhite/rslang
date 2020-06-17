/* eslint-disable class-methods-use-this */
export default class HttpClient {
  constructor() {
    this.token = localStorage.token;
    this.userId = localStorage.userId;
  }

  async getWords(group, page, maxLength, wordsPerPage) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${maxLength}&wordsPerPage=${wordsPerPage}`;
    const rawResponse = await fetch(url);
    if (!rawResponse.ok) {
      throw new Error('Can`t get words, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async getWordsTotalNumber(group, maxLength, wordsPerPage) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}&wordsPerExampleSentenceLTE=${maxLength}&wordsPerPage=${wordsPerPage}`;
    const rawResponse = await fetch(url);
    if (!rawResponse.ok) {
      throw new Error('Can`t get words, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /* returns object like: {
      "count": "number"
    } */
  }

  async createNewUser(user) {
    // user object must contain email and password fields
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 417) {
      throw new Error('User with this e-mail exists');
    }
    if (rawResponse.status === 422) {
      throw new Error('Email or password fields has invalid value or empty');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t create user, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /*     returns object like : {
      "id": "string",
      "email": "string, email value"
    } */
  }

  async loginUser(user) {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 403) {
      throw new Error('Incorrect e-mail or password');
    }
    if (rawResponse.status === 404) {
      throw new Error('Couldn`t find any user with this email');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t login user, network problems');
    }
    const content = await rawResponse.json();
    this.userId = content.userId;
    this.token = content.token;
    localStorage.setItem('token', content.token);
    localStorage.setItem('userId', content.userId);

    return content;

    /*     returns object loke: {
      "message": "Authenticated",
      "token": "eyJhbGciO...M",
      "userId": "5eea1b73dffad00017faa748"
    } */
  }

  async getUser() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (rawResponse.status === 404) {
      throw new Error('Can`t get user with this ID');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /*     returns object like:{
      "id": "string",
      "email": "string, email value"
    } */
  }

  async updateUser(newUserData) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t update user, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /*     returns object like: {
      "id": "string",
      "email": "string, email value"
    } */
  }

  async deleteUser() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t delete user, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async getAllUserWords() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /* returns array of words */
  }

  async getUserWordById(wordId) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async createUserWord({
    wordData, wordId, difficulty,
  }) {
    const requestBody = {
      difficulty,
      optional: wordData,
    };
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (rawResponse.status === 417) {
      throw new Error('Such user word already exists');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t create user word, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /*     returns object like: {
      "id": "string",
      "wordId": "string"
    } */
  }

  async updateUserWord({
    wordId, wordData, difficulty,
  }) {
    const requestBody = {
      difficulty,
      optional: wordData,
    };
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t create user word, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async deleteUserWord(wordId) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async createUserStatistics({
    learnedWords, optional,
  }) {
    const requestBody = {
      learnedWords,
      optional,
    };
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t create user statistics, network problems');
    }
    const content = await rawResponse.json();

    return content;
    // returns object like:{
    //   "id": "string",
    //   "learnedWords": "number",
    //   "optional": {
    //     ......
    //   }
    // }
  }

  async getUserStatistics() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (rawResponse.status === 404) {
      throw new Error('Can`t find user statistics');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get statistics, network problems');
    }
    const content = await rawResponse.json();

    return content;
    /*    returns object like {
      "id": "5eea3830e0f08ce84754a9f7",
      "learnedWords": "number",
      "optional": {
        ...
      }
    } */
  }

  async createUserSettings({
    wordsPerDay, optional,
  }) {
    const requestBody = {
      wordsPerDay,
      optional,
    };
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t create user settings, network problems');
    }
    const content = await rawResponse.json();

    return content;
    /*     returns object like {
      "id": "string",
      "optional": {
        ...
      },
      "wordsPerDay": "number"
    } */
  }

  async getUserSettings() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (rawResponse.status === 404) {
      throw new Error('Can`t find user settings');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user settings, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /*     returns object like {
      "id": "string",
      "optional": {
        ...
      },
      "wordsPerDay": 10
    } */
  }
}

/* eslint-enable class-methods-use-this */
