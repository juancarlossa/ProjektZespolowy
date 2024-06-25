

export function chatHrefConstructor (id1:string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}

export function formatTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hora = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutos = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const segundos = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return `${hora}:${minutos}`;
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}