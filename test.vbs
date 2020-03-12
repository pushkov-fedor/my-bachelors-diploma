Set obj = createobject("Excel.Application")
obj.visible = true
Set obj1 = obj.Workbooks.open("C:\model\OMMM2030.xlsm")

' obj.Application.run "'C:\model\ommm_ieie_Walras.xls'!Button_Solve_GlpSol"
obj.Application.run "'C:\model\ommm_ieie_Walras.xls'!Button_Solve_GlpSol_WebPlatform", "16384"

' SaveSetting "LP-VK-Excel", "Options", "SheetLimit", "123"

' Имя листа с параметрами модели
' Число столбцов на листе (Не более 16384)

' Полный путь к файлам GlpSol

' Меню2030

' 16384

' C:\model\glpsol.bat

