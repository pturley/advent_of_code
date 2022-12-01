class Five
  def initialize()
    file = File.open("input5.txt")
    @lines = file.readlines.map(&:chomp).map do |line|
      line.split(" -> ").map do |point_text|
        {
          x: point_text.split(",")[0].to_i,
          y: point_text.split(",")[1].to_i,
        }
      end
    end
  end

  def part1()
    counts = {}
    @lines.each do |line|
      points_in_line = []
      start_point = line[0]
      end_point = line[1]

      if start_point[:x] == end_point[:x]
        ends = [start_point[:y], end_point[:y]].sort
        (ends[0]..ends[1]).each do |y|
          points_in_line << {x: start_point[:x], y: y}
        end
      elsif start_point[:y] == end_point[:y]
        ends = [start_point[:x], end_point[:x]].sort
        (ends[0]..ends[1]).each do |x|
          points_in_line << {x: x, y: start_point[:y]}
        end
      end

      points_in_line.each do |point|
        counts[point] ||= 0
        counts[point] += 1
      end
    end


    counts.values.select { |v| v > 1 }.length
  end

  def part2()
    counts = {}
    @lines.each do |line|
      points_in_line = []
      start_point = line[0]
      end_point = line[1]

      if start_point[:x] == end_point[:x]
        ends = [start_point[:y], end_point[:y]].sort
        (ends[0]..ends[1]).each do |y|
          points_in_line << {x: start_point[:x], y: y}
        end
      elsif start_point[:y] == end_point[:y]
        ends = [start_point[:x], end_point[:x]].sort
        (ends[0]..ends[1]).each do |x|
          points_in_line << {x: x, y: start_point[:y]}
        end
      else
        x_delta = end_point[:x] - start_point[:x] == 0 ? 0 : (end_point[:x] - start_point[:x]) / ((end_point[:x] - start_point[:x]).abs)
        y_delta = end_point[:y] - start_point[:y] == 0 ? 0 : (end_point[:y] - start_point[:y]) / ((end_point[:y] - start_point[:y]).abs)
        points_in_line << start_point
        while points_in_line.last != end_point
          points_in_line << {x: points_in_line.last[:x] + x_delta, y: points_in_line.last[:y] + y_delta}
        end
      end

      points_in_line.each do |point|
        counts[point] ||= 0
        counts[point] += 1
      end
    end

    counts.values.select { |v| v > 1 }.length
  end
end

five = Five.new

puts "Part 1: #{five.part1()}"
puts "Part 2: #{five.part2()}"
