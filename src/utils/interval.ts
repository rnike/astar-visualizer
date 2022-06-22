const timeout = 1;

export default function interval() {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
