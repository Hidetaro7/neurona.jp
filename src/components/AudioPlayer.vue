<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref, watch, computed } from "vue";
import playlist from "../assets/playlist.json";

const isPlaying = ref(false);
const collapsed = ref(true);

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

const songTitleClicked = (id) => {
  playId.value = id;
  isPlaying.value = true;
  play();
  console.log(songById.value);
};
</script>

<template>
  <div class="player-container" :class="{ 'is-open': !collapsed }">
    <div class="player-inner">
      <div class="main-content" @click="collapsed = false">
        <div class="jacket-picture">
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
        <div class="titles">
          <div class="song-title">{{ songById.title }}</div>
          <div class="artist-name">ニューロナ</div>
        </div>
      </div>
      <div class="control">
        <button @click="changeSong(-1)">
          <Icon icon="material-symbols:fast-rewind-rounded" class="icon-skip" />
        </button>

        <button @click="isPlaying = !isPlaying">
          <Icon
            icon="material-symbols:play-arrow-rounded"
            class="icon-play"
            v-show="!isPlaying"
          />
          <Icon
            icon="material-symbols:pause"
            class="icon-play"
            v-show="isPlaying"
          />
        </button>

        <button @click="changeSong(1)">
          <Icon
            icon="material-symbols:fast-forward-rounded"
            class="icon-skip"
          />
        </button>
      </div>

      <div class="play-list not-prose">
        <ul>
          <li v-for="song in playlist" :key="song.id">
            <button
              class="text-button !rounded-none w-full !px-0 !py-3.5 border-t border-white/20"
              @click="songTitleClicked(song.id)"
            >
              <div
                class="playing-bars mini-bar"
                :class="{ 'opacity-0': song.id !== playId || !isPlaying }"
              >
                <span></span><span></span><span></span>
              </div>
              <span class="text-sm">{{ song.title }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <button
      class="icon-button hover:bg-white/10 absolute right-2 top-2 rounded"
      @click="collapsed = true"
      v-show="!collapsed"
    >
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        class="text-4xl text-white"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.text-button {
  @apply text-black dark:text-white hover:bg-black/10 hover:text-white/80 active:text-gray-200/70 w-full flex items-center justify-start;
}
.player-container {
  @apply rounded-lg backdrop-blur-sm dark:bg-black/80 bg-white/40 px-4 py-3 inline-block fixed bottom-4 left-4 leading-none w-[calc(_100%_-_32px)] md:w-1/3 transition-all max-h-[calc(_100dvh_-_32px_)];
}
.player-inner {
  @apply flex gap-x-4;
}
.main-content {
  @apply flex gap-x-4 grow;
}
.jacket-picture {
  @apply w-11 aspect-square bg-white rounded shrink-0 place-content-center grid bg-[url(/photo-square.jpg)] bg-cover bg-center bg-no-repeat;
}
.play-buttons {
  button {
    @apply icon-button dark:text-white hover:bg-white/5 hover:text-white/80 active:text-gray-200/70 w-auto h-auto;
  }
}
.titles {
  @apply text-black dark:text-white;
}
.song-title {
  @apply text-base font-bold;
}
.artist-name {
  @apply text-xs;
}
.control {
  @apply flex items-center gap-x-2.5 play-buttons;
  .icon-skip {
    @apply text-xl;
  }
  .icon-play {
    @apply text-3xl;
  }
}
.play-list {
  @apply hidden;
  ul,
  li {
    @apply list-none m-0 p-0;
  }
}

.is-open {
  &.player-container {
    @apply py-8 inset-4 overflow-hidden;
  }
  .player-inner {
    @apply flex-col items-center justify-center transition-all h-full;
  }
  .main-content {
    @apply flex-col gap-y-2 text-center items-center;
  }
  .jacket-picture {
    @apply w-64 transition-all;
  }
  .titles {
    @apply my-2;
  }
  .song-title {
    @apply text-xl;
  }
  .artist-name {
    @apply text-sm;
  }
  .control {
    @apply gap-x-4;
    .icon-skip {
      @apply text-3xl;
    }
    .icon-play {
      @apply text-5xl;
    }
  }

  .play-list {
    @apply block w-64 mt-4 overflow-y-auto h-full;
  }
}
</style>
