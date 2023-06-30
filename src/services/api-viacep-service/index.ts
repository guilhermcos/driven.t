import { request } from '@/utils/request';
import { ViaCEPAddress } from '../../protocols';

export async function getAdressFromViaCep(cep: string) {
  const response = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
  const data = response.data;
  if (response.status === 400) {
    return false;
  }
  if (data.erro === true) {
    return false;
  }

  const result: ViaCEPAddress = {
    logradouro: data.logradouro,
    complemento: data.complemento,
    bairro: data.bairro,
    cidade: data.localidade,
    uf: data.uf,
  };
  return result;
}
