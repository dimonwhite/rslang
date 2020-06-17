/* eslint-disable class-methods-use-this */
export default class HttpClient {
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

    return content;

    /*     returns object loke: {
      "message": "Authenticated",
      "token": "eyJhbGciO...M",
      "userId": "5eea1b73dffad00017faa748"
    } */
  }

  async getUser(userId, token) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
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

  async updateUser(userId, newUserData, token) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
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

  async deleteUser(userId, token) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t delete user, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async getAllUserWords(userId, token) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user, network problems');
    }
    const content = await rawResponse.json();

    return content;

    /* returns array of words */
  }

  async getUserWordById(userId, token, wordId) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
    }
    if (!rawResponse.ok) {
      throw new Error('Can`t get user words, network problems');
    }
    const content = await rawResponse.json();

    return content;
  }

  async createUserWord({
    userId, token, wordData, difficulty, wordId,
  }) {
    const requestBody = {
      difficulty,
      optional: wordData,
    };
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (rawResponse.status === 401) {
      throw new Error('Access token is missing or invalid');
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
}

/* eslint-enable class-methods-use-this */
