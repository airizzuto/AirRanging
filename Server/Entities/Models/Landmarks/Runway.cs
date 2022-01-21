using Entities.Models.Enums.Landmarks;

namespace Entities.Models.Landmarks
{
    public class Runway
    {
        public (int,int) Headings { get; set; }
        public string Suffix { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Elevation { get; set; }
        public int Gradient { get; set; }
        public ESurfaceType SurfaceType { get; set; }
        public string WeightLimit { get; set; }

        // public List<EAirstripLights> Lights { get; set; }
    }
}