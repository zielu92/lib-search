<template>
  <div class="chat blue-container">
    <h2>Ask LLM about this book</h2>
    <div v-if="response">
      <h2>Response:</h2>
      <span class="info">*results might be slightly far from the truth</span>
      <div class="response">{{ response }}</div>
    </div>
    <form @submit.prevent="sendPrompt">
      <input type="text" id="prompt" :class="{ invalid: !isPromptValid }" v-model="prompt"
        placeholder="Enter your question" />
      <button type="submit" v-if="!isLoading">Ask</button>
      <span v-else class="cloud-loader"></span>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { Book } from '@/types/Book';
import { bookContext } from '@/helpers/contextBuilder';
import { Validatable } from '@/types/Validatable';
import { validate } from '@/helpers/validator';

@Component
export default class Chat extends Vue {
  @Prop() readonly book!: Book;
  prompt: string = '';
  isPromptValid = true;
  response: string | null = null;
  isLoading = false;

  async sendPrompt() {
    const promptyValidatable: Validatable = {
      value: this.prompt,
      required: true,
      minLength: 2
    };

    this.isPromptValid = validate(promptyValidatable);
    if (this.isPromptValid) {
      this.isLoading = true;

      const requestData = {
        model: process.env.VUE_APP_OLLAMA_MODEL || 'llama3.1',
        prompt: `${bookContext(this.book)} ${this.prompt}`,
        stream: false,
      };

      try {
        const result = await axios.post(`${process.env.VUE_APP_OLLAMA_ENDPOINT}/api/generate`, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.response = result.data.response;
        this.isLoading = false;
        this.$nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        });
      } catch (error) {
        console.error('Error communicating with the server:', error);
        this.response = 'Error communicating with the server.';
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.chat {
  margin-top: 20px;
  padding: 20px;
}

.response {
  padding: 10px 100px 10px 100px;
  margin-bottom: 10px;
  text-align: justify;
}

@media only screen and (max-width: 768px) {
  .response {
    padding: 10px 2px 10px 1px;
  }
}

.info {
  font-size: 0.6em;
}

.chat form {
  flex-direction: column;
}

.chat form input {
  width: 60%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
}

.chat form button {
  width: 20%;
  padding: 10px;
  font-size: 16px;
  background-color: #e1b675;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat form button:hover {
  background-color: #b08f5e;
}

.cloud-loader {
  width: 175px;
  height: 80px;
  display: block;
  margin: auto;
  background-image: linear-gradient(#263238 50px, transparent 0), radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), radial-gradient(circle 50px at 50px 50px, #FFF 100%, transparent 0), radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), linear-gradient(#FFF 50px, transparent 0);
  background-size: 64px 6px, 50px 50px, 100px 76px, 50px 50px, 120px 40px;
  background-position: 55px 60px, 0px 30px, 37px 0px, 122px 30px, 25px 40px;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
}

.cloud-loader::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(-180deg);
  top: 62px;
  height: 64px;
  width: 60px;
  background-color: #FFF;
  background-image: linear-gradient(#DDD 20px, transparent 0), linear-gradient(#DDD 5px, transparent 0), linear-gradient(#DDD 10px, transparent 0), linear-gradient(#DDD 10px, transparent 0);
  background-size: 50px 20px;
  background-position: 5px 36px, 5px 25px, 5px 10px;
  background-repeat: no-repeat;
  border-radius: 2px 2px 4px 4px;
  z-index: 10;
  box-shadow: 0px -4px 7px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  animation: animloader 4s linear infinite;
}

@keyframes animloader {
  0% {
    height: 64px;
  }

  90%,
  100% {
    height: 0px;
  }
}

@media only screen and (max-width: 768px) {
  .chat form button, .chat form input {
    width: 80%;
  }
}
</style>