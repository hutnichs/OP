using System;

public class Program
{
    public static void Main()
    {
        TimeoutColorIterator.ConsumeWithTimeout(
            CyclicDateGenerator.GenerateDaysOfWeek(),
            5
        );
    }
}