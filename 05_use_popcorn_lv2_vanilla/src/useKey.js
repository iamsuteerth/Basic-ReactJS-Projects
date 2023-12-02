import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function listenerCallBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", listenerCallBack);
      return function () {
        document.removeEventListener("keydown", listenerCallBack);
      };
    },
    [key, action]
  );
}
