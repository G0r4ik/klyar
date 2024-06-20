<template>
  <div class="edit popup-wrapper" @click="$emit('close')">
    <div @click.stop class="edit__inner card">
      <div class="edit__cross popup-wrapper__cross" @click="$emit('close')">
        ❌
      </div>
      <span class="edit__title">Редактирование товара</span>
      <label class="edit__label" for="edit__title-item">
        Название товара:
        <input type="text" name="" class="edit__input" id="edit__title-item" v-model.lazy.trim="item_.title" />
      </label>
      <label class="edit__label" for="edit__price">
        Цена товара:
        <input type="text" name="" class="edit__input" id="edit__price" v-model.lazy.trim="item_.price" />
      </label>
      <label class="edit__label" for="edit__count">
        Количество товара на складе:
        <input type="text" name="" class="edit__input" id="edit__count" v-model.lazy.trim="item_.total_count_item" />
      </label>
      <label class="edit__label" for="edit__img">
        Картинка товара:
        <input type="text" name="" class="edit__input" id="edit__img" v-model.lazy.trim="item_.img" />
      </label>

      <label class="edit__label" for="country_manufacture">
        Страна-производитель:
        <input type="text" name="" class="edit__input" id="country_manufacture"
          v-model.lazy.trim="item_.country_manufacture" />
      </label>
      <label class="edit__label" for="printing_technology">
        Технология печати:
        <input type="text" name="" class="edit__input" id="printing_technology"
          v-model.lazy.trim="item_.printing_technology" />
      </label>
      <label class="edit__label" for="print_color">
        Цвет печати:
        <input type="text" name="" class="edit__input" id="print_color" v-model.lazy.trim="item_.print_color" />
      </label>

      <label class="edit__label edit__label_last" for="edit__desc">
        Описание товара:
      </label>
      <textarea type="text" name="" class="edit__textarea" id="edit__desc" v-model.lazy.trim="item_.description">
      </textarea>
      <button class="edit__btn" @click="edit">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  data() {
    return {
      item_: { ...this.item },
    };
  },
  props: {
    item: { type: Object, required: true, },
  },
  methods: {
    async edit() {
      const item = this.item_
      await fetch(
        `http://localhost:3000/editProduct?productId=${this.item_.id}`,
        {
          body: JSON.stringify({ item }),
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          method: 'POST',
        }
      )
    }
  }
};

</script>


<style>
.edit {
  z-index: 100;
  background: rgba(1, 1, 1, 0.5);
}

.edit__cross {
  width: 20px;
  height: 20px;
}

.edit__inner {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;
  position: relative;
}

.edit__title {
  font-size: 22px;
  margin-bottom: 25px;
}

.edit__label {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.edit__label_last {
  margin-bottom: 2px;
}

.edit__input {
  border-radius: 5px;
  border: 1px solid #e7e8ec;
  padding: 2px 10px;
  padding-left: 5px;
  margin-left: 5px;
  margin-left: auto;
  min-width: 150px;
}

.edit__btn {
  margin-top: 15px;
  background: #1c5383;
  border-radius: 15px;
  color: #fff;
  border: none;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}

.edit__textarea {
  width: 100%;
  height: 100px;
  resize: none;
}
</style>