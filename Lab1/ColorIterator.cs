using System;
using System.Collections.Generic;
using System.Diagnostics;

public static class TimeoutColorIterator
{
    public static void ConsumeWithTimeout<T>(
        IEnumerable<T> source,
        int timeoutSeconds)
    {
        ConsoleColor[] colors =
        {
            ConsoleColor.Red,
            ConsoleColor.Yellow,
            ConsoleColor.Green,
            ConsoleColor.Cyan,
            ConsoleColor.Blue,
            ConsoleColor.Magenta,
            ConsoleColor.White
        };

        int colorIndex = 0;
        var stopwatch = Stopwatch.StartNew();

        foreach (var item in source)
        {
            if (stopwatch.Elapsed.TotalSeconds >= timeoutSeconds)
                break;

            Console.ForegroundColor = colors[colorIndex];
            Console.WriteLine($"{DateTime.Now:HH:mm:ss} - {item}");

            colorIndex = (colorIndex + 1) % colors.Length;
        }

        Console.ResetColor();
    }
}

public class Program
{
    public static void Main()
    {
        TimeoutColorIterator.ConsumeWithTimeout(GenerateNumbers(),5);
    }

    private static IEnumerable<int> GenerateNumbers()
    {
        int i = 1;
        while (true)
        {
            yield return i++;
        }
    }
}