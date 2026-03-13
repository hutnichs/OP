using System;
using MyTestLib.DateGen;

class DemoCyclicDateGenerator
{
    static void Main()
    {
        var days = CyclicDateGenerator.GenerateDaysOfWeek();

        int count = 0;
        foreach (var day in days)
        {
            Console.WriteLine(day); // Виводить дні тижня 10 разів i зупиняється
            count++;
            if (count >= 10) break;
        }
    }
}