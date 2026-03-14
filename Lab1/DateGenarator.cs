using System;
using System.Collections.Generic;

public static class CyclicDateGenerator
{
    public static IEnumerable<string> GenerateDaysOfWeek()
    {
        string[] days =
        {
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        };

        int index = 0;

        while (true)
        {
            yield return days[index];
            index = (index + 1) % days.Length;
        }
    }
}

public class Program
{
    public static void Main()
    {
        foreach (var day in CyclicDateGenerator.GenerateDaysOfWeek())
        {
            Console.WriteLine(day);
        }
    }
}