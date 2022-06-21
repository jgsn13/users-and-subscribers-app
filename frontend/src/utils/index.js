export function formatCPF(cpf) {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9
  )}`;
}

export function formatPhoneNumber(number) {
  return `(${number.slice(0, 2)}) ${number.slice(2, 3)} ${number.slice(
    3,
    7
  )}-${number.slice(7)}`;
}

export function formatCEP(cep) {
  return `${cep.slice(0, 5)}-${cep.slice(5)}`;
}

export function cpfValidator(cpf) {
  let sum;
  let rest;
  sum = 0;
  let isSequence = true;
  for (let i = 0; i < cpf.length; i++) {
    if (cpf[0] !== cpf[i]) isSequence = false
  }
  if (isSequence) return false;

  for (let i=1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11))  rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}
