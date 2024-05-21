<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        class="pagination-button hover:text-white"
      >
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        class="pagination-button hover:text-white"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li class="pagination-item" v-for="page in pages" :key="page.name">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ activebtn: isPageActive(page.name) }"
        class="pagination-button hover:text-white"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        class="pagination-button hover:text-white"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
        class="pagination-button hover:text-white"
      >
        Last
      </button>
    </li>
  </ul>
</template>
    
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },

    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },

    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },

  mounted() {},

  methods: {
    //Méthode qui permet d'aller sur la page numéro 1
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },

    //Méthode qui permet d'aller sur la page précédente
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },

    //Méthode qui permet d'aller sur une page quelconque
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },

    //Méthode qui permet de naviger sur la page suivante
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },

    //Méthode qui permet de naviguer sur la dernière page
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },

    //Méthode qui met en évidence la page active
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
    
<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  @apply text-gray-600 mt-2 inline-block;
}

.pagination-button {
  @apply border-2 m-1 sm:px-1.5 lg:px-3 py-1 hover:bg-[#07693A];
}

.activebtn {
  background-color: #07693a;
  color: #ffffff;
}
</style>