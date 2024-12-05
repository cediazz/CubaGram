from datetime import datetime,timedelta

def format_date_HMS(value:str):
  # Convertir la cadena a un objeto de tipo datetime
  converted_date = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%fZ")
  # Formatear la fecha en el formato deseado: día/mes/año hora
  formatted_date = converted_date.strftime('%d/%m/%Y %H:%M:%S')
  return formatted_date