import { computed, CSSProperties, defineComponent, nextTick, onMounted, ref, watch } from "vue";
import tinycolor from "tinycolor2";
import { DOMUtils, DragEventOptions } from "@aesoper/normal-utils";

export default defineComponent({
  name: "Light",
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
    light: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 100;
      },
    },
    hue: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 360;
      },
    },
    saturation: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 100;
      },
    },
  },
  emits: ["update:light", "change"],
  setup(props, { emit }) {
    const bar = ref<HTMLElement | null>(null);
    const barHandle = ref<HTMLElement | null>(null);

    const handleLeft = ref(0);
    const handleTop = ref(0);

    const currentLight = ref(props.light);

    const getComputedLightnessBg = computed(() => {
      const color1 = tinycolor({
        h: props.hue,
        s: props.saturation,
        l: 0.8,
      }).toPercentageRgbString();
      const color2 = tinycolor({
        h: props.hue,
        s: props.saturation / 100,
        l: 0.6,
      }).toPercentageRgbString();
      const color3 = tinycolor({
        h: props.hue,
        s: props.saturation / 100,
        l: 0.4,
      }).toPercentageRgbString();
      const color4 = tinycolor({
        h: props.hue,
        s: props.saturation / 100,
        l: 0.2,
      }).toPercentageRgbString();
      let deg = "left";
      if (props.vertical) {
        deg = "top";
      }
      return {
        background: `-webkit-linear-gradient(${deg}, rgb(255, 255, 255), ${color1}, ${color2}, ${color3}, ${color4}, rgb(0, 0, 0))`,
      } as CSSProperties;
    });

    const getBarLeftPosition = () => {
      if (props.vertical) return 0;
      if (bar.value && barHandle.value) {
        const light = currentLight.value;
        const rect = bar.value?.getBoundingClientRect();

        return (
          ((100 - light) / 100) * (rect.width - barHandle.value.offsetWidth) +
          barHandle.value.offsetWidth / 2
        );
      }
      return 7;
    };

    const getBarTopPosition = () => {
      if (!props.vertical) return 0;
      if (bar.value && barHandle.value) {
        const light = currentLight.value;
        const rect = bar.value?.getBoundingClientRect();

        return (
          ((100 - light) / 100) * (rect.height - barHandle.value?.offsetHeight) +
          barHandle.value?.offsetHeight / 2
        );
      }
      return 0;
    };

    const updatePosition = () => {
      handleLeft.value = getBarLeftPosition();
      handleTop.value = getBarTopPosition();
    };

    const handleDrag = (event: MouseEvent) => {
      if (bar.value && barHandle.value) {
        const rect = bar.value?.getBoundingClientRect();

        let light = currentLight.value;
        if (!props.vertical) {
          let left = event.clientX - rect.left;
          left = Math.max(barHandle.value.offsetWidth / 2, left);
          left = Math.min(left, rect.width - barHandle.value.offsetWidth / 2);

          light = Math.round(
            ((left - barHandle.value.offsetWidth / 2) /
              (rect.width - barHandle.value.offsetWidth)) *
              100
          );
          currentLight.value = 100 - light;
        } else {
          let top = event.clientY - rect.top;
          top = Math.max(barHandle.value?.offsetHeight / 2, top);
          top = Math.min(top, rect.height - barHandle.value.offsetHeight / 2);

          light = Math.round(
            ((top - barHandle.value.offsetHeight / 2) /
              (rect.height - barHandle.value.offsetHeight)) *
              100
          );

          currentLight.value = light;
        }

        emit("update:light", currentLight.value);
        emit("change", currentLight.value);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (target !== barHandle.value) {
        handleDrag(event);
      }
    };

    watch(
      () => props.light,
      (light: number) => {
        currentLight.value = light;
      }
    );

    watch(
      () => currentLight.value,
      () => {
        updatePosition();
      }
    );

    onMounted(() => {
      nextTick(() => {
        const dragConfig: DragEventOptions = {
          drag: (event: Event) => {
            handleDrag(event as MouseEvent);
          },
          end: (event: Event) => {
            handleDrag(event as MouseEvent);
          },
        };

        if (bar.value && barHandle.value) {
          DOMUtils.triggerDragEvent(bar.value, dragConfig);
          DOMUtils.triggerDragEvent(barHandle.value, dragConfig);
        }
        updatePosition();
      });
    });

    return () => {
      const wrapClass = [
        "bee-light-colorPicker",
        "transparent",
        {
          "is-vertical": props.vertical,
          "small-light-slider": props.size === "small" && !props.vertical,
        },
      ];
      return (
        <div class={wrapClass}>
          <div
            class="bee-light-colorPicker__inner"
            ref={bar}
            style={getComputedLightnessBg.value}
            onClick={handleClick}
          >
            <div
              class={[
                "bee-light-colorPicker__inner-pointer",
                { "small-bar": props.size === "small" && !props.vertical },
              ]}
              ref={barHandle}
              style={{
                left: handleLeft.value + "px",
                top: handleTop.value + "px",
              }}
            >
              <div class={["bee-light-colorPicker__inner-handle", { vertical: props.vertical }]} />
            </div>
          </div>
        </div>
      );
    };
  },
});
