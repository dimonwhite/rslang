import { backendUrl } from '../../constants';
/* eslint-disable class-methods-use-this */
export default class HttpClient {
  constructor() {
    this.token = localStorage.token;
    this.userId = localStorage.userId;
    this.headerNoToken = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.headerNoContentType = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
    };
    this.headerWithContentType = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async getWords({
    group, page, maxLength, wordsPerPage,
  }) {
    const url = `${backendUrl}/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${maxLength}&wordsPerPage=${wordsPerPage}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Can`t get words, network problems');
    }
    const content = await response.json();

    return content;
  }

  async getWordsTotalNumber({ group, maxLength, wordsPerPage }) {
    const url = `${backendUrl}/words/count?group=${group}&wordsPerExampleSentenceLTE=${maxLength}&wordsPerPage=${wordsPerPage}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Can`t get words, network problems');
    }
    const content = await response.json();

    return content;

    /* returns object like: {
      "count": "number"
    } */
  }

  async createNewUser(user) {
    // user object must contain email and password fields
    const response = await fetch(`${backendUrl}/users`, {
      method: 'POST',
      headers: this.headerNoToken,
      body: JSON.stringify(user),
    });
    if (response.status === 417) {
      throw new Error('User with this e-mail exists');
    }
    if (response.status === 422) {
      throw new Error('Email or password fields has invalid value or empty');
    }
    if (!response.ok) {
      throw new Error('Can`t create user, network problems');
    }
    const content = await response.json();

    return content;

    /*     returns object like : {
      "id": "string",
      "email": "string, email value"
    } */
  }

  async loginUser(user) {
    const response = await fetch(`${backendUrl}/signin`, {
      method: 'POST',
      headers: this.headerNoToken,
      body: JSON.stringify(user),
    });
    if (response.status === 403) {
      throw new Error('Incorrect e-mail or password');
    }
    if (response.status === 404) {
      throw new Error('Couldn`t find any user with this email');
    }
    if (!response.ok) {
      throw new Error('Can`t login user, network problems');
    }
    const content = await response.json();
    this.userId = content.userId;
    this.token = content.token;
    this.tokenCreateTime = new Date().getTime();
    localStorage.setItem('token', content.token);
    localStorage.setItem('userId', content.userId);
    localStorage.setItem('tokenCreateTime', this.tokenCreateTime);

    return content;

    /*     returns object loke: {
      "message": "Authenticated",
      "token": "eyJhbGciO...M",
      "userId": "5eea1b73dffad00017faa748"
    } */
  }

  async getUser() {
    const response = await fetch(`${backendUrl}/users/${this.userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (response.status === 404) {
      throw new Error('Can`t get user with this ID');
    }
    if (!response.ok) {
      throw new Error('Can`t get user, network problems');
    }
    const content = await response.json();

    return content;

    /*     returns object like:{
      "id": "string",
      "email": "string, email value"
    } */
  }

  async updateUser(newUserData) {
    const response = await fetch(`${backendUrl}/users/${this.userId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: this.headerNoContentType,
      body: JSON.stringify(newUserData),
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t update user, network problems');
    }
    const content = await response.json();

    return content;

    /*     returns object like: {
      "id": "string",
      "email": "string, email value"
    } */
  }

  async deleteUser() {
    const response = await fetch(`${backendUrl}/users/${this.userId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t delete user, network problems');
    }
    const content = await response.json();

    return content;
  }

  async getAllUserWords() {
    const response = await fetch(`${backendUrl}/users/${this.userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await response.json();

    return content;

    /* returns array of words */
  }

  async getUserWordById(wordId) {
    const response = await fetch(`${backendUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await response.json();

    return content;
  }

  async createUserWord({
    wordData, wordId, difficulty,
  }) {
    const requestBody = {
      difficulty,
      optional: wordData,
    };
    const response = await fetch(`${backendUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: this.headerWithContentType,
      body: JSON.stringify(requestBody),
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (response.status === 417) {
      throw new Error('Such user word already exists');
    }
    if (!response.ok) {
      throw new Error('Can`t create user word, network problems');
    }
    const content = await response.json();

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
    const response = await fetch(`${backendUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: this.headerWithContentType,
      body: JSON.stringify(requestBody),
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t create user word, network problems');
    }
    const content = await response.json();

    return content;
  }

  async deleteUserWord(wordId) {
    const response = await fetch(`${backendUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await response.json();

    return content;
  }

  async createUserStatistics({
    learnedWords, optional,
  }) {
    const requestBody = {
      learnedWords,
      optional,
    };
    const response = await fetch(`${backendUrl}/users/${this.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: this.headerWithContentType,
      body: JSON.stringify(requestBody),
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t create user statistics, network problems');
    }
    const content = await response.json();

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
    const response = await fetch(`${backendUrl}/users/${this.userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (response.status === 404) {
      throw new Error('Can`t find user statistics');
    }
    if (!response.ok) {
      throw new Error('Can`t get statistics, network problems');
    }
    const content = await response.json();

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
    const response = await fetch(`${backendUrl}/users/${this.userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: this.headerWithContentType,
      body: JSON.stringify(requestBody),
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (!response.ok) {
      throw new Error('Can`t create user settings, network problems');
    }
    const content = await response.json();

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
    const response = await fetch(`${backendUrl}/users/${this.userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: this.headerNoContentType,
    });
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid, try relogin');
    }
    if (response.status === 404) {
      throw new Error('Can`t find user settings');
    }
    if (!response.ok) {
      throw new Error('Can`t get user settings, network problems');
    }
    const content = await response.json();

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
