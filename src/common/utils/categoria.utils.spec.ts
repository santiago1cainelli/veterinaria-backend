import { calcularCategoriaSocial } from './categoria.utils';
import { CategoriaSocial } from '../enums/categoria-social.enum';

describe('calcularCategoriaSocial', () => {
  const parametros = {
    edadMinimaActivo: 18,
    edadMinimaVitalicio: 60,
    antiguedadMinimaVitalicio: 30,
  };

  const hoy = new Date();

  const fechaConAniosAtras = (anios: number) => {
    const f = new Date(hoy);
    f.setFullYear(hoy.getFullYear() - anios);
    return f;
  };

  it('debe asignar CADETE si el socio tiene menos de 18 años', () => {
    const nacimiento = fechaConAniosAtras(15);
    const alta = fechaConAniosAtras(2);
    expect(calcularCategoriaSocial(nacimiento, alta, parametros)).toBe(CategoriaSocial.CADETE);
  });

  it('debe asignar ACTIVO si tiene entre 18 y 59 años', () => {
    const nacimiento = fechaConAniosAtras(25);
    const alta = fechaConAniosAtras(3);
    expect(calcularCategoriaSocial(nacimiento, alta, parametros)).toBe(CategoriaSocial.ACTIVO);
  });

  it('debe asignar VITALICIO si tiene 60 o más años y 30 o más de antigüedad', () => {
    const nacimiento = fechaConAniosAtras(60);
    const alta = fechaConAniosAtras(30);
    expect(calcularCategoriaSocial(nacimiento, alta, parametros)).toBe(CategoriaSocial.VITALICIO);
  });

  it('debe asignar ACTIVO si tiene 60 años pero menos de 30 años de antigüedad', () => {
    const nacimiento = fechaConAniosAtras(60);
    const alta = fechaConAniosAtras(25);
    expect(calcularCategoriaSocial(nacimiento, alta, parametros)).toBe(CategoriaSocial.ACTIVO);
  });

  it('debe asignar ACTIVO si tiene 30 años de antigüedad pero menos de 60 años de edad', () => {
    const nacimiento = fechaConAniosAtras(48);
    const alta = fechaConAniosAtras(30);
    expect(calcularCategoriaSocial(nacimiento, alta, parametros)).toBe(CategoriaSocial.ACTIVO);
  });
});
