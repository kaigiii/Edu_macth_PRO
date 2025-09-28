import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

/**
 * 自定義 Hook 用於在 React 元件中安全地使用 GSAP 動畫
 * @param animationFunction - 包含 GSAP 動畫邏輯的函數
 * @param dependencies - 依賴陣列，當依賴變化時重新執行動畫
 */
export const useGsap = (
  animationFunction: () => gsap.core.Timeline | gsap.core.Tween | void,
  dependencies: any[] = []
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // 清理之前的動畫
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // 執行動畫函數
    const result = animationFunction();
    
    // 保存 timeline 引用以便後續清理
    if (result && 'kill' in result) {
      timelineRef.current = result as gsap.core.Timeline;
    }

    // 清理函數
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // 清理 ScrollTrigger 實例
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, dependencies);

  return timelineRef.current;
};

/**
 * 創建 ScrollTrigger 動畫的便捷 Hook
 * @param triggerElement - 觸發元素
 * @param animationFunction - 動畫函數
 * @param scrollTriggerConfig - ScrollTrigger 配置
 */
export const useScrollTrigger = (
  triggerElement: React.RefObject<HTMLElement>,
  animationFunction: () => gsap.core.Timeline | gsap.core.Tween,
  scrollTriggerConfig: ScrollTrigger.StaticVars = {}
) => {
  return useGsap(() => {
    if (!triggerElement.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: false,
        ...scrollTriggerConfig
      }
    });

    return animationFunction();
  }, [triggerElement.current]);
};

export default useGsap;
