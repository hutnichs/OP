using System;
using MyTestLib.DateGen;
using MyTestLib.ColorIt;

class DemoBoth
{
    static void Main()
    {
        var days = CyclicDateGenerator.GenerateDaysOfWeek();
        // Виводить дні тижня поруч з датою в різних кольорах 5 секунд
        TimeoutColorIterator.ConsumeWithTimeout(days, 5);
    }
}