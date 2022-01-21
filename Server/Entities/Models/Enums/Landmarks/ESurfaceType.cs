using System.Runtime.Serialization;

namespace Entities.Models.Enums.Landmarks
{
    public enum ESurfaceType
    {
        [EnumMember(Value = "Unknown")]
        U = 0,

        [EnumMember(Value = "Asphalt")]
        ASP = 1,

        [EnumMember(Value = "Bituminous")]
        BIT,

        [EnumMember(Value = "Bricks")]
        BRI,

        [EnumMember(Value = "Clay")]
        CLA,

        [EnumMember(Value = "Composite")]
        COM,

        [EnumMember(Value = "Concrete")]
        CON,

        [EnumMember(Value = "Composite")]
        COP,

        [EnumMember(Value = "Coral")]
        COR,

        [EnumMember(Value = "Graded")]
        GRE,

        [EnumMember(Value = "Grass")]
        GRS,

        [EnumMember(Value = "Gravel")]
        GVL,

        [EnumMember(Value = "Ice")]
        ICE,

        [EnumMember(Value = "Laterite")]
        LAT,

        [EnumMember(Value = "Macadam")]
        MAC,

        [EnumMember(Value = "PartiallyRigid")]
        PEM,

        [EnumMember(Value = "PermanentUnknown")]
        PER,

        [EnumMember(Value = "MarstonMatting")]
        PSP,

        [EnumMember(Value = "Sand")]
        SAN,

        [EnumMember(Value = "Sommerfield")]
        SMT,

        [EnumMember(Value = "Snow")]
        SNO,

        [EnumMember(Value = "Water")]
        WAT
    }
}