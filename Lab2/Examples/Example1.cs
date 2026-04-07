using System;
using System.Collections.Generic;
using MyTestLib.ColorIt;

class DemoTimeoutColorIterator
{
    static void Main()
    {
        var numbers = new List<int> { 1, 2, 3, 4, 5 };
        var cyclingNumbers = CycleList(numbers);

        // Виводить цифри зі списку поруч з датою в різних кольорах 3 секунди
        TimeoutColorIterator.ConsumeWithTimeout(cyclingNumbers, 3);
    }

    static IEnumerable<T> CycleList<T>(IEnumerable<T> source)
    {
        var list = new List<T>(source);
        while (true)
        {
            foreach (var item in list)
                yield return item;
        }
    }
}