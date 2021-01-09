<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Change Email</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Old Password">
        <b-input type="email" v-model="email" placeholder="Old Email" required>
        </b-input>
      </b-field>

      <b-field label="New Password">
        <b-input
          type="email"
          v-model="newEmail"
          placeholder="New Email"
          required
        >
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" type="button" @click="change">
        Go
      </button>
    </footer>
  </div>
</template>

<script>
import { userService } from "../services/userService";
export default {
  name: "ChangeEmail",
  props: ["user"],
  data() {
    return {
      email: "",
      newEmail: "",
    };
  },
  methods: {
    change() {
      console.log("Hello");
      userService
        .changeEmail(this.user.username, this.email, this.newEmail)
        .then((message) => {
          if (message.success == true) {
            this.$parent.close();
            this.$buefy.toast.open({
              message: "Email changed!",
              type: "is-success",
            });
          } else {
            this.$parent.close();
            this.$buefy.toast.open({
              message: "Some fields were not correct!",
              type: "is-danger",
            });
          }
        })
        .catch(() => {
          this.$parent.close();
          this.$buefy.toast.open({
            message: "Error: Try again later!",
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style></style>
