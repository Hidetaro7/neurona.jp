<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref, watch, computed } from "vue";
import playlist from "../assets/playlist.json";

const isPlaying = ref(false);

const playId = ref(0);
const songById = computed(
  () => playlist.filter((song) => song.id === playId.value)[0]
);

let audio;
onMounted(() => {
  audio = new Audio();
  audio.src = songById.value.src;
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    changeSong(1);
  });
});

watch(playId, () => play);

watch(isPlaying, (newIsPlaying) => {
  if (newIsPlaying) {
    play();
  } else {
    audio.pause();
  }
});

const changeSong = (increment) => {
  const id = playId.value + increment;
  playId.value = id < 0 ? playlist.length - 1 : id % playlist.length;
  play();
};

const play = () => {
  if (isPlaying.value) {
    audio.src = songById.value.src;
    audio.play();
  }
};
</script>

<template>
  <div
    class="rounded-lg backdrop-blur-sm dark:bg-black/40 bg-white/40 px-4 py-3 inline-block fixed bottom-4 left-4 leading-none w-[calc(_100%_-_32px)] lg:w-1/3"
  >
    <div class="flex gap-x-4">
      <div
        class="w-11 aspect-square bg-white rounded shrink-0 place-content-center grid bg-[url(/photo-square.jpg)] bg-cover bg-center bg-no-repeat"
      >
        <Icon
          v-show="!isPlaying"
          icon="material-symbols:music-note-rounded"
          class="text-3xl"
        />
        <div
          v-show="isPlaying"
          class="rounded-full w-10 aspect-square border border-gray-400 place-content-center grid relative"
        >
          <div class="playing-bars">
            <span></span><span></span><span></span>
          </div>

          <div
            class="rounded-full w-10 aspect-square border-t-4 border-white absolute z-10 animate-spin"
          ></div>
        </div>
      </div>
      <div class="grow dark:text-white">
        <div class="text-base font-bold">{{ songById.title }}</div>
        <div class="text-xs">ニューロナ</div>
      </div>
      <div class="flex items-center gap-x-2.5 play-buttons pl-4">
        <button @click="changeSong(-1)">
          <Icon icon="material-symbols:fast-rewind-rounded" class="text-xl" />
        </button>

        <button @click="isPlaying = !isPlaying">
          <Icon
            icon="material-symbols:play-arrow-rounded"
            class="text-3xl"
            size="3rem"
            v-show="!isPlaying"
          />
          <Icon
            icon="material-symbols:pause"
            class="text-3xl"
            size="3rem"
            v-show="isPlaying"
          />
        </button>

        <button @click="changeSong(1)">
          <Icon icon="material-symbols:fast-forward-rounded" class="text-xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.play-buttons {
  button {
    @apply icon-button dark:text-white hover:bg-white/5 hover:text-white/80 active:text-gray-200/70 w-auto h-auto;
  }
}
</style>
