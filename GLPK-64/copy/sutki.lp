\* Problem: sutki *\
Maximize
 obj:
 + 1704.33 S1M11 + 1742.25 S2M11 + 2823.3 S3M11 + 2348.53 S4M11 + 2900.77 S5M11
 + 1627.24 S1M12 + 1663.7 S2M12 + 2703.18 S3M12 + 2246.67 S4M12 + 2777.67 S5M12
 + 539.06 S1M13 + 568.68 S2M13 + 1028.39 S3M13 + 765.18 S4M13 + 985.64 S5M13
 + 513.63 S1M15 + 542.36 S2M15 + 988.14 S3M15 + 732.9 S4M15 + 946.68 S5M15
 + 489.7 S1M17 + 517.59 S2M17 + 950.25 S3M17 + 702.52 S4M17 + 910.02 S5M17
 + 645.16 S1M19 + 668.87 S2M19 + 1157.74 S3M19 + 821.05 S4M19 + 1573.33 S5M19
 + 622.11 S1M20 + 645.24 S2M20 + 1122.19 S3M20 + 793.71 S4M20 + 1527.64 S5M20
 + 579.22 S1M21 + 601.27 S2M21 + 1056.04 S3M21 + 742.84 S4M21 + 1442.64 S5M21
 + 559.24 S1M22 + 580.79 S2M22 + 1025.22 S3M22 + 719.14 S4M22 + 1403.03 S5M22
 + 540.15 S1M23 + 561.22 S2M23 + 995.77 S3M23 + 696.49 S4M23 + 1365.19 S5M23 + 3013.17 S6M23
 + 521.88 S1M24 + 542.49 S2M24 + 967.6 S3M24 + 674.83 S4M24 + 1328.99 S5M24 + 2885.74 S6M24 + 3013.17 S7M24
 + 504.39 S1M25 + 524.57 S2M25 + 940.63 S3M25 + 654.09 S4M25 + 1294.33 S5M25 + 2767.75 S6M25 + 2885.74 S7M25
 + 487.64 S1M26 + 507.39 S2M26 + 914.79 S3M26 + 634.21 S4M26 + 1261.11 S5M26 + 2658.19 S6M26 + 2767.75 S7M26

Subject To
 R11: + S1M11 + S2M11 + S3M11 + S4M11 + S5M11 - M11 = 0
 R12: + S1M12 + S2M12 + S3M12 + S4M12 + S5M12 - M12 = 0
 R13: + S1M13 + S2M13 + S3M13 + S4M13 + S5M13 - M13 = 0
 R15: + S1M15 + S2M15 + S3M15 + S4M15 + S5M15 - M15 = 0
 R17: + S1M17 + S2M17 + S3M17 + S4M17 + S5M17 - M17 = 0
 R19: + S1M19 + S2M19 + S3M19 + S4M19 + S5M19 - M19 = 0
 R20: + S1M20 + S2M20 + S3M20 + S4M20 + S5M20 - M20 = 0
 R21: + S1M21 + S2M21 + S3M21 + S4M21 + S5M21 - M21 = 0
 R22: + S1M22 + S2M22 + S3M22 + S4M22 + S5M22 - M22 = 0
 R23: + S1M23 + S2M23 + S3M23 + S4M23 + S5M23 + S6M23 - M23 = 0
 R24: + S1M24 + S2M24 + S3M24 + S4M24 + S5M24 + S6M24 + S7M24 - M24 = 0
 R25: + S1M25 + S2M25 + S3M25 + S4M25 + S5M25 + S6M25 + S7M25 - M25 = 0
 R26: + S1M26 + S2M26 + S3M26 + S4M26 + S5M26 + S6M26 + S7M26 - M26 = 0
 limitSite1: + S1 - S1M11 - S1M12 - S1M13 - S1M15 - S1M17 - S1M19 - S1M20 - S1M21 - S1M22 - S1M23 - S1M24 - S1M25 - S1M26 >= 0
 limitSite2: + S2 - S2M11 - S2M12 - S2M13 - S2M15 - S2M17 - S2M19 - S2M20 - S2M21 - S2M22 - S2M23 - S2M24 - S2M25 - S2M26 >= 0
 limitSite3: + S3 - S3M11 - S3M12 - S3M13 - S3M15 - S3M17 - S3M19 - S3M20 - S3M21 - S3M22 - S3M23 - S3M24 - S3M25 - S3M26 >= 0
 limitSite4: + S4 - S4M11 - S4M12 - S4M13 - S4M15 - S4M17 - S4M19 - S4M20 - S4M21 - S4M22 - S4M23 - S4M24 - S4M25 - S4M26 >= 0
 limitSite5: + S5 - S5M11 - S5M12 - S5M13 - S5M15 - S5M17 - S5M19 - S5M20 - S5M21 - S5M22 - S5M23 - S5M24 - S5M25 - S5M26 >= 0
 limitSite6: + S6 - S6M23 - S6M24 - S6M25 - S6M26 >= 0
 limitSite7: + S7 - S7M24 - S7M25 - S7M26 >= 0
 limitSite8: + S8 >= 0
 limitSite9: + S9 >= 0
 limitSite10: + S10 >= 0
 limitSite11: + S11 >= 0
 limitSite12: + S12 >= 0
 limitSite13: + S13 >= 0
 limitSite14: + S14 >= 0
 limitSite15: + S15 >= 0
 limitSite16: + S16 >= 0
 limitSite17: + S17 >= 0
 limitSite18: + S18 >= 0
 limitSite19: + S19 >= 0
 limitSite20: + S20 >= 0
 limitSite21: + S21 >= 0
 limitSite22: + S22 >= 0
 limitSite23: + S23 >= 0
 limitSite24: + S24 >= 0
 limitSite25: + S25 >= 0
 limitSite26: + S26 >= 0
 limitSite27: + S27 >= 0
 limitSite28: + S28 >= 0
 limitSite29: + S29 >= 0
 limitSite30: + S30 >= 0
 rootSite1: + S1 = 31
 rootSite2: + S2 = 15
 rootSite3: + S3 = 5
 rootSite4: + S4 = 5
 rootSite5: + S5 = 4
 rootSite6: + S6 - M1 = 0
 rootSite7: + S7 - M4 = 0
 rootSite8: + S8 - M5 = 0
 rootSite9: + S9 - M8 = 0
 rootSite10: + S10 - M11 = 0
 rootSite11: + S11 - M12 = 0
 rootSite12: + S12 - M13 = 0
 rootSite13: + S13 - M15 = 0
 rootSite14: + S14 - M17 = 0
 rootSite15: + S15 - M2 = 0
 rootSite16: + S16 - M6 = 0
 rootSite17: + S17 - M3 - M9 = 0
 rootSite18: + S18 - M7 = 0
 rootSite19: + S19 - M19 = 0
 rootSite20: + S20 - M10 = 0
 rootSite21: + S21 - M20 = 0
 rootSite22: + S22 - M14 = 0
 rootSite23: + S23 - M21 = 0
 rootSite24: + S24 - M16 = 0
 rootSite25: + S25 - M22 = 0
 rootSite26: + S26 - M18 = 0
 rootSite27: + S27 - M23 = 0
 rootSite28: + S28 - M24 = 0
 rootSite29: + S29 - M25 = 0
 rootSite30: + S30 - M26 = 0
Bounds
 M1 = 0
 M2 = 0
 M3 = 0
 M4 = 0
 M5 = 0
 M6 = 0
 M7 = 0
 M8 = 0
 M9 = 0
 M10 = 0
 M11 <= 3
 M12 <= 2
 M13 <= 5
 M14 = 0
 M15 <= 5
 M16 = 0
 M17 <= 5
 M18 = 0
 M19 <= 5
 M20 <= 5
 M21 <= 5
 M22 <= 5
 M23 <= 5
 M24 <= 5
 M25 <= 5
 M26 <= 5
 S1M11 >= 0
 S2M11 >= 0
 S3M11 >= 0
 S4M11 >= 0
 S5M11 >= 0
 S1M12 >= 0
 S2M12 >= 0
 S3M12 >= 0
 S4M12 >= 0
 S5M12 >= 0
 S1M13 >= 0
 S2M13 >= 0
 S3M13 >= 0
 S4M13 >= 0
 S5M13 >= 0
 S1M15 >= 0
 S2M15 >= 0
 S3M15 >= 0
 S4M15 >= 0
 S5M15 >= 0
 S1M17 >= 0
 S2M17 >= 0
 S3M17 >= 0
 S4M17 >= 0
 S5M17 >= 0
 S1M19 >= 0
 S2M19 >= 0
 S3M19 >= 0
 S4M19 >= 0
 S5M19 >= 0
 S1M20 >= 0
 S2M20 >= 0
 S3M20 >= 0
 S4M20 >= 0
 S5M20 >= 0
 S1M21 >= 0
 S2M21 >= 0
 S3M21 >= 0
 S4M21 >= 0
 S5M21 >= 0
 S1M22 >= 0
 S2M22 >= 0
 S3M22 >= 0
 S4M22 >= 0
 S5M22 >= 0
 S1M23 >= 0
 S2M23 >= 0
 S3M23 >= 0
 S4M23 >= 0
 S5M23 >= 0
 S6M23 >= 0
 S1M24 >= 0
 S2M24 >= 0
 S3M24 >= 0
 S4M24 >= 0
 S5M24 >= 0
 S6M24 >= 0
 S7M24 >= 0
 S1M25 >= 0
 S2M25 >= 0
 S3M25 >= 0
 S4M25 >= 0
 S5M25 >= 0
 S6M25 >= 0
 S7M25 >= 0
 S1M26 >= 0
 S2M26 >= 0
 S3M26 >= 0
 S4M26 >= 0
 S5M26 >= 0
 S6M26 >= 0
 S7M26 >= 0

End
