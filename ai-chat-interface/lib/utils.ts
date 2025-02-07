import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = async (text:string) => {
  try {
    // Try using the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea hidden but keep it in the page
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    // Select and copy the text
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    
    // Clean up
    textArea.remove();
    return true;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};

// Usage example:
// await copyToClipboard('Text to copy');