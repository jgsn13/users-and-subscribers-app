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
