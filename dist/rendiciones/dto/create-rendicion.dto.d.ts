export declare class DetalleCobranzaDto {
    cuponId: number;
    importeCobrado: number;
    cobrado?: boolean;
}
export declare class CreateRendicionDto {
    cobradorId: number;
    semanaInicio: string;
    semanaFin: string;
    detalles: DetalleCobranzaDto[];
    esUltimaSemanaDelMes?: boolean;
}
