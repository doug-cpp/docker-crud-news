/**
 * Converte um timestamp em uma data formatada para
 * uma string amigável de data e hora brasileiros. 
 */
export const formatDatetime = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR');
}