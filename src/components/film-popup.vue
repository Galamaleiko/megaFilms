<template>

  <div class="film-popup">
    <div class="film-popup__content">
      <slot></slot>
    </div>
    <div class="film-popup__footer">
      <button @click="closePopup" class="close-info">Close</button>
      <button onclick="window.open('https://kiev.ticketsbox.com/en/cinema/','_blank')" class="close-info">Book</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "film-popup",
  methods: {
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>

<style lang="scss">
.film-popup {
  padding: 16px;
  position: fixed;
  top: 200px;
  width: 1000px;
  border-radius: 15px;
  background: #345467;
  box-shadow: 0 0 17px 1000px rgba(58, 58, 58, 0.47);
  z-index: 9;

  &__header, &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
  }
}

a.button {
  -webkit-appearance: button;
  -moz-appearance: button;

  text-decoration: none;
}
.close-info {
  padding: 8px;
  color: #ffff;
  background: #2894dc;
  border-radius: 9px;

  width: 10%;
}
</style>