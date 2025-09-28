// 修復 framer-motion 類型問題
declare module 'framer-motion' {
  import { ComponentType, HTMLAttributes, RefAttributes } from 'react';
  
  export interface MotionProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLElement>;
    layout?: boolean;
    animate?: any;
    initial?: any;
    whileInView?: any;
    whileHover?: any;
    whileTap?: any;
    transition?: any;
    drag?: any;
    dragConstraints?: any;
    dragTransition?: any;
    onHoverStart?: (e: React.MouseEvent) => void;
    onHoverEnd?: () => void;
  }
  
  export const motion: {
    [K in keyof JSX.IntrinsicElements]: ComponentType<MotionProps & JSX.IntrinsicElements[K]>;
  };
  
  export function useScroll(options?: any): any;
  export function useTransform(value: any, inputRange: any[], outputRange: any[]): any;
  export function useSpring(value: any, config?: any): any;
  export function useMotionValueEvent(value: any, event: string, callback: (value: any) => void): void;
}
